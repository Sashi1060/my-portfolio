"use client";

// The 3D avatar. Imported only when the assistant widget is opened (see AssistantWidget), so
// three.js and the model never load on a page view by themselves.

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils, type VRM } from "@pixiv/three-vrm";

import {
  FACE_EXPRESSIONS,
  MODEL_LOAD_TIMEOUT_MS,
  MOUTH_SHAPES,
  approach,
  blinkWeight,
  breathing,
  canBlink,
  faceTargets,
  headPose,
  mouthWeights,
  nextBlinkDelay,
  type AvatarMood,
} from "@/lib/avatar/behaviour";

export type AvatarStatus = "loading" | "ready" | "failed";

type Props = {
  modelUrl: string;
  mood: AvatarMood;
  thinking: boolean;
  /** Epoch ms until which the mouth moves. */
  talkUntil: number;
  /** False while the widget is closed: rendering pauses. */
  active: boolean;
  /** The teleport pose: two fingers to the forehead, eyes closed. */
  posing?: boolean;
  onStatus: (status: AvatarStatus, progress?: number) => void;
};

// Head-and-shoulders framing, relative to the head bone (which sits at the base of the skull).
const CAMERA_FOV = 30;
const CAMERA_DISTANCE = 1.0;
const CAMERA_HEIGHT = 0.06;
const AIM_HEIGHT = 0.03;
// Upper arms lowered from the T-pose the model is exported in.
const ARM_DOWN = 1.2;

// Teleport pose, as directions in the model's own space (it faces +Z; its right hand is at -X).
// Elbow out to the side and forward, forearm rising, wrist bent so the two straight fingers
// point up to the right side of the forehead (not across the face).
const POSE_UPPER_ARM = new THREE.Vector3(-0.55, -0.2, 0.8).normalize();
const POSE_FOREARM = new THREE.Vector3(0.62, 0.77, -0.12).normalize();
const POSE_HAND = new THREE.Vector3(0.08, 0.98, -0.18).normalize();
const REST_RIGHT_ARM = new THREE.Vector3(-1, 0, 0);
// Ring and little fingers and the thumb fold in; index and middle stay straight.
const FOLDED_FINGERS = [
  "rightRingProximal",
  "rightRingIntermediate",
  "rightRingDistal",
  "rightLittleProximal",
  "rightLittleIntermediate",
  "rightLittleDistal",
  "rightThumbProximal",
  "rightThumbDistal",
] as const;
const FINGER_FOLD = 1.1;

type PoseBone = { node: THREE.Object3D; rest: THREE.Quaternion; target: THREE.Quaternion };

/** Rest and target rotations for every bone the teleport pose moves. */
function buildTeleportPose(vrm: VRM): PoseBone[] {
  const humanoid = vrm.humanoid;
  const bones: PoseBone[] = [];
  const add = (name: Parameters<typeof humanoid.getNormalizedBoneNode>[0], rest: THREE.Quaternion, target: THREE.Quaternion) => {
    const node = humanoid.getNormalizedBoneNode(name);
    if (node) bones.push({ node, rest, target });
  };

  const upper = new THREE.Quaternion().setFromUnitVectors(REST_RIGHT_ARM, POSE_UPPER_ARM);
  const forearmInUpperSpace = POSE_FOREARM.clone().applyQuaternion(upper.clone().invert());
  const lower = new THREE.Quaternion().setFromUnitVectors(REST_RIGHT_ARM, forearmInUpperSpace);
  const handInLowerSpace = POSE_HAND.clone().applyQuaternion(upper.clone().multiply(lower).invert());
  const hand = new THREE.Quaternion().setFromUnitVectors(REST_RIGHT_ARM, handInLowerSpace);
  add("rightUpperArm", new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, ARM_DOWN)), upper);
  add("rightLowerArm", new THREE.Quaternion(), lower);
  add("rightHand", new THREE.Quaternion(), hand);
  const fold = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, FINGER_FOLD));
  for (const finger of FOLDED_FINGERS) add(finger, new THREE.Quaternion(), fold);
  return bones;
}

export default function AvatarStage({ modelUrl, mood, thinking, talkUntil, active, posing = false, onStatus }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // The render loop reads the latest props through refs, so it never restarts.
  const live = useRef({ mood, thinking, talkUntil, active, posing, onStatus });
  live.current = { mood, thinking, talkUntil, active, posing, onStatus };
  const wakeRef = useRef<() => void>(() => {});

  useEffect(() => {
    wakeRef.current();
  }, [active]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let vrm: VRM | null = null;
    let frame = 0;
    let onScreen = true;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      live.current.onStatus("failed");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = "block";
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 20);
    const light = new THREE.DirectionalLight(0xffffff, Math.PI);
    light.position.set(0.6, 1.2, 1.5);
    scene.add(light, new THREE.AmbientLight(0xffffff, 0.6));
    const lookTarget = new THREE.Object3D();
    scene.add(lookTarget);
    const headPosition = new THREE.Vector3(0, 1.35, 0);

    const resize = () => {
      const { clientWidth: width, clientHeight: height } = container;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // ─── Animation state ───
    const timer = new THREE.Timer();
    let elapsed = 0;
    const face: Record<string, number> = { happy: 0, sad: 0, relaxed: 0, surprised: 0 };
    const mouth: Record<string, number> = { aa: 0, ih: 0, ou: 0, ee: 0, oh: 0 };
    let thinkingWeight = 0;
    let poseWeight = 0;
    let poseBones: PoseBone[] = [];
    let blinkAt = nextBlinkDelay();
    let talkStartedFor = 0;
    let talkStart = 0;

    const animate = (dt: number) => {
      if (!vrm) return;
      elapsed += dt;
      const state = live.current;
      const expressions = vrm.expressionManager;

      const targets = faceTargets(state.mood);
      for (const name of FACE_EXPRESSIONS) {
        face[name] = approach(face[name], targets[name], dt, 6);
        expressions?.setValue(name, face[name]);
      }

      // Blinking (suppressed while smiling: VRoid's smile already closes the eyes).
      let blink = 0;
      if (elapsed >= blinkAt) {
        blink = blinkWeight(elapsed - blinkAt);
        if (blink === 0 && elapsed - blinkAt > 0.2) blinkAt = elapsed + nextBlinkDelay();
      }
      // Eyes close while holding the teleport pose (concentrating).
      poseWeight = approach(poseWeight, state.posing ? 1 : 0, dt, 9);
      const eyes = canBlink(face.happy) ? blink : 0;
      expressions?.setValue("blink", Math.max(eyes, poseWeight));

      // Mouth: moves while a reply is "being said".
      const now = Date.now();
      const talking = now < state.talkUntil;
      if (talking && talkStartedFor !== state.talkUntil) {
        talkStartedFor = state.talkUntil;
        talkStart = elapsed;
      }
      const shapes = talking ? mouthWeights(elapsed - talkStart) : null;
      for (const name of MOUTH_SHAPES) {
        mouth[name] = approach(mouth[name], shapes ? shapes[name] : 0, dt, 18);
        expressions?.setValue(name, mouth[name]);
      }

      // Head, breathing and gaze.
      thinkingWeight = approach(thinkingWeight, state.thinking || state.mood === "thinking" ? 1 : 0, dt, 4);
      const pose = headPose(elapsed, thinkingWeight * (1 - poseWeight));
      const head = vrm.humanoid.getNormalizedBoneNode("head");
      head?.rotation.set(pose.pitch + 0.04 * poseWeight, pose.yaw * (1 - poseWeight), pose.roll * (1 - poseWeight));
      for (const bone of poseBones) bone.node.quaternion.slerpQuaternions(bone.rest, bone.target, poseWeight);
      const neck = vrm.humanoid.getNormalizedBoneNode("neck");
      neck?.rotation.set(pose.pitch * 0.4, pose.yaw * 0.4, pose.roll * 0.3);
      const chest = vrm.humanoid.getNormalizedBoneNode("chest");
      chest?.rotation.set(breathing(elapsed), 0, 0);

      // Look at the visitor; glance up and aside while thinking.
      lookTarget.position.set(
        camera.position.x + 0.25 * thinkingWeight,
        camera.position.y + 0.3 * thinkingWeight,
        camera.position.z,
      );

      vrm.update(dt);
    };

    // ─── Render loop: runs only while visible ───
    const shouldRun = () => live.current.active && onScreen && document.visibilityState === "visible";
    const tick = () => {
      frame = 0;
      if (disposed || !shouldRun()) return;
      timer.update();
      animate(Math.min(timer.getDelta(), 0.1));
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame && vrm && shouldRun()) {
        timer.update(); // skip the paused time
        frame = requestAnimationFrame(tick);
      }
    };
    wakeRef.current = wake;
    const intersection = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? true;
      wake();
    });
    intersection.observe(container);
    document.addEventListener("visibilitychange", wake);

    // ─── Load the model ───
    const timeout = window.setTimeout(() => {
      if (!vrm && !disposed) {
        disposed = true;
        live.current.onStatus("failed");
      }
    }, MODEL_LOAD_TIMEOUT_MS);

    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));
    live.current.onStatus("loading", 0);
    loader
      .loadAsync(modelUrl, (event) => {
        if (!disposed && event.total) live.current.onStatus("loading", event.loaded / event.total);
      })
      .then((gltf) => {
        const loaded = gltf.userData.vrm as VRM | undefined;
        if (!loaded) throw new Error("Not a VRM file");
        if (disposed) {
          VRMUtils.deepDispose(gltf.scene);
          return;
        }
        VRMUtils.removeUnnecessaryVertices(gltf.scene);
        VRMUtils.combineSkeletons(gltf.scene);
        VRMUtils.rotateVRM0(loaded);
        loaded.scene.traverse((object) => {
          object.frustumCulled = false;
        });

        const humanoid = loaded.humanoid;
        humanoid.getNormalizedBoneNode("leftUpperArm")?.rotation.set(0, 0, -ARM_DOWN);
        humanoid.getNormalizedBoneNode("rightUpperArm")?.rotation.set(0, 0, ARM_DOWN);
        poseBones = buildTeleportPose(loaded);
        loaded.update(0);
        scene.add(loaded.scene);

        // Frame the head and shoulders, whatever the model's height.
        humanoid.getNormalizedBoneNode("head")?.getWorldPosition(headPosition);
        camera.position.set(0, headPosition.y + CAMERA_HEIGHT, CAMERA_DISTANCE);
        camera.lookAt(0, headPosition.y + AIM_HEIGHT, 0);
        if (loaded.lookAt) loaded.lookAt.target = lookTarget;

        vrm = loaded;
        window.clearTimeout(timeout);
        live.current.onStatus("ready");
        renderer.render(scene, camera);
        wake();
      })
      .catch(() => {
        if (!disposed) {
          disposed = true;
          live.current.onStatus("failed");
        }
      });

    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      if (frame) cancelAnimationFrame(frame);
      wakeRef.current = () => {};
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", wake);
      if (vrm) VRMUtils.deepDispose(vrm.scene);
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [modelUrl]);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
}
