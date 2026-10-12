// How the avatar reacts: expressions per emotion, blinking, mouth movement and head motion.
// Pure functions only (no three.js), so they can be unit-tested and are cheap to bundle.

import type { AssistantEmotion } from "@/lib/assistant/types";

export type AvatarMood = AssistantEmotion;
export type FaceExpression = "happy" | "sad" | "relaxed" | "surprised";
export type MouthShape = "aa" | "ih" | "ou" | "ee" | "oh";
export type AvatarMode = "3d" | "still";

export const FACE_EXPRESSIONS: readonly FaceExpression[] = ["happy", "sad", "relaxed", "surprised"];
export const MOUTH_SHAPES: readonly MouthShape[] = ["aa", "ih", "ou", "ee", "oh"];

/** Kept moderate: full-strength VRoid expressions look exaggerated at head-and-shoulders framing. */
const MOOD_FACES: Record<AvatarMood, Partial<Record<FaceExpression, number>>> = {
  neutral: {},
  happy: { happy: 0.6 },
  thinking: { relaxed: 0.25 },
  apologetic: { sad: 0.45 },
};

/** How long an emotion stays on the face after the avatar finishes "talking". */
export const MOOD_HOLD_MS = 6000;
/** Give up on the 3D model and keep the still image after this long. */
export const MODEL_LOAD_TIMEOUT_MS = 45000;

/** Target weight (0–1) for every face expression in a mood. */
export function faceTargets(mood: AvatarMood): Record<FaceExpression, number> {
  const face = MOOD_FACES[mood] ?? {};
  return { happy: face.happy ?? 0, sad: face.sad ?? 0, relaxed: face.relaxed ?? 0, surprised: face.surprised ?? 0 };
}

/** VRoid's "happy" face closes the eyes, so blinking on top of it looks wrong. */
export function canBlink(happyWeight: number): boolean {
  return happyWeight < 0.4;
}

/** Smoothly move `current` towards `target`; frame-rate independent. */
export function approach(current: number, target: number, dt: number, rate = 8): number {
  if (dt <= 0) return current;
  return target + (current - target) * Math.exp(-rate * dt);
}

/** How long the mouth moves for a reply: roughly reading pace, within sensible bounds. */
export function talkDurationMs(text: string): number {
  return Math.min(6000, Math.max(1200, text.trim().length * 45));
}

/** Seconds until the next blink: natural-looking, between 2 and 6 seconds. */
export function nextBlinkDelay(random: number = Math.random()): number {
  return 2 + Math.min(1, Math.max(0, random)) * 4;
}

const BLINK_CLOSE = 0.06;
const BLINK_OPEN = 0.09;

/** Eyelid weight `elapsed` seconds into a blink (0 = open, 1 = closed); 0 once the blink is over. */
export function blinkWeight(elapsed: number): number {
  if (elapsed < 0) return 0;
  if (elapsed < BLINK_CLOSE) return elapsed / BLINK_CLOSE;
  if (elapsed < BLINK_CLOSE + BLINK_OPEN) return 1 - (elapsed - BLINK_CLOSE) / BLINK_OPEN;
  return 0;
}

const SYLLABLES_PER_SECOND = 7;

/** Simple talking mouth (no audio yet): one vowel per "syllable", opening and closing. */
export function mouthWeights(t: number): Record<MouthShape, number> {
  const weights: Record<MouthShape, number> = { aa: 0, ih: 0, ou: 0, ee: 0, oh: 0 };
  if (t < 0) return weights;
  const position = t * SYLLABLES_PER_SECOND;
  const index = Math.floor(position);
  // Deterministic "random" vowel per syllable, so the same moment always looks the same.
  const hash = Math.abs(Math.sin(index * 12.9898) * 43758.5453) % 1;
  const shape = MOUTH_SHAPES[Math.floor(hash * MOUTH_SHAPES.length)];
  const openness = Math.sin((position - index) * Math.PI);
  weights[shape] = 0.25 + 0.45 * openness * (0.6 + 0.4 * hash);
  return weights;
}

export type HeadPose = { pitch: number; yaw: number; roll: number };

/**
 * Small idle head movement, in radians. `thinking` (0–1) blends in a tilt and an upward glance.
 * Negative pitch looks up.
 */
export function headPose(t: number, thinking: number): HeadPose {
  const k = Math.min(1, Math.max(0, thinking));
  return {
    pitch: Math.sin(t * 0.4) * 0.025 - 0.08 * k,
    yaw: Math.sin(t * 0.5) * 0.05 + Math.sin(t * 0.23) * 0.03 + 0.06 * k,
    roll: Math.sin(t * 0.31) * 0.02 + 0.12 * k,
  };
}

/** Gentle breathing: chest rotation in radians. */
export function breathing(t: number): number {
  return Math.sin(t * 1.6) * 0.015;
}

/** Show the 3D avatar only when the device can and the visitor hasn't asked for less motion or data. */
export function chooseAvatarMode(env: { webgl: boolean; reducedMotion: boolean; saveData: boolean }): AvatarMode {
  if (!env.webgl || env.reducedMotion || env.saveData) return "still";
  return "3d";
}
