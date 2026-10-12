import { test } from "node:test";
import assert from "node:assert/strict";

import {
  FACE_EXPRESSIONS,
  MOUTH_SHAPES,
  approach,
  blinkWeight,
  canBlink,
  chooseAvatarMode,
  faceTargets,
  headPose,
  mouthWeights,
  nextBlinkDelay,
  talkDurationMs,
} from "../lib/avatar/behaviour.ts";

// ─── Emotion → expression ───

test("each emotion maps to the right face", () => {
  assert.equal(faceTargets("happy").happy, 0.6);
  assert.ok(faceTargets("apologetic").sad > 0);
  assert.ok(faceTargets("thinking").relaxed > 0);
  assert.deepEqual(faceTargets("neutral"), { happy: 0, sad: 0, relaxed: 0, surprised: 0 });
});

test("every face target is defined and between 0 and 1", () => {
  for (const mood of ["neutral", "happy", "thinking", "apologetic"] as const) {
    const targets = faceTargets(mood);
    for (const name of FACE_EXPRESSIONS) {
      assert.ok(targets[name] >= 0 && targets[name] <= 1, `${mood}.${name}`);
    }
  }
});

test("an unknown emotion falls back to a neutral face", () => {
  assert.deepEqual(faceTargets("excited" as never), faceTargets("neutral"));
});

test("only one strong expression at a time (no mixed faces)", () => {
  for (const mood of ["neutral", "happy", "thinking", "apologetic"] as const) {
    const strong = Object.values(faceTargets(mood)).filter((value) => value > 0);
    assert.ok(strong.length <= 1, mood);
  }
});

// ─── Smoothing ───

test("approach moves towards the target and never overshoots", () => {
  let value = 0;
  for (let i = 0; i < 10; i += 1) {
    const next = approach(value, 1, 1 / 60);
    assert.ok(next > value && next < 1);
    value = next;
  }
  assert.ok(approach(0, 1, 5) > 0.999);
  assert.equal(approach(0.3, 1, 0), 0.3);
});

test("approach is frame-rate independent", () => {
  let sixty = 0;
  for (let i = 0; i < 60; i += 1) sixty = approach(sixty, 1, 1 / 60);
  let thirty = 0;
  for (let i = 0; i < 30; i += 1) thirty = approach(thirty, 1, 1 / 30);
  assert.ok(Math.abs(sixty - thirty) < 1e-9);
});

// ─── Blinking ───

test("blinks are 2 to 6 seconds apart", () => {
  assert.equal(nextBlinkDelay(0), 2);
  assert.equal(nextBlinkDelay(1), 6);
  assert.equal(nextBlinkDelay(-3), 2);
  assert.equal(nextBlinkDelay(9), 6);
});

test("a blink closes then reopens the eyes quickly", () => {
  assert.equal(blinkWeight(-0.1), 0);
  assert.equal(blinkWeight(0), 0);
  assert.equal(blinkWeight(0.06), 1);
  assert.ok(blinkWeight(0.1) > 0 && blinkWeight(0.1) < 1);
  assert.equal(blinkWeight(0.2), 0);
});

test("no blinking while smiling (VRoid's smile already closes the eyes)", () => {
  assert.equal(canBlink(0), true);
  assert.equal(canBlink(faceTargets("happy").happy), false);
});

// ─── Mouth ───

test("the mouth opens one vowel at a time while talking", () => {
  for (let t = 0; t < 3; t += 0.037) {
    const weights = mouthWeights(t);
    const open = MOUTH_SHAPES.filter((name) => weights[name] > 0);
    assert.equal(open.length, 1, `t=${t}`);
    assert.ok(weights[open[0]] <= 0.7);
  }
});

test("the mouth uses several vowels and is deterministic", () => {
  const used = new Set<string>();
  for (let t = 0; t < 5; t += 0.1) {
    const weights = mouthWeights(t);
    used.add(MOUTH_SHAPES.find((name) => weights[name] > 0) ?? "");
  }
  assert.ok(used.size >= 3);
  assert.deepEqual(mouthWeights(1.234), mouthWeights(1.234));
  assert.deepEqual(mouthWeights(-1), { aa: 0, ih: 0, ou: 0, ee: 0, oh: 0 });
});

test("talking lasts roughly as long as reading the reply, within bounds", () => {
  assert.equal(talkDurationMs("Hi"), 1200);
  assert.equal(talkDurationMs("x".repeat(100)), 4500);
  assert.equal(talkDurationMs("x".repeat(5000)), 6000);
});

// ─── Head ───

test("idle head movement stays small", () => {
  for (let t = 0; t < 60; t += 0.5) {
    const pose = headPose(t, 0);
    assert.ok(Math.abs(pose.pitch) < 0.05 && Math.abs(pose.yaw) < 0.1 && Math.abs(pose.roll) < 0.05);
  }
});

test("thinking tilts the head and glances up", () => {
  const idle = headPose(0, 0);
  const thinking = headPose(0, 1);
  assert.ok(thinking.roll > idle.roll + 0.1);
  assert.ok(thinking.pitch < idle.pitch); // negative pitch looks up
  assert.deepEqual(headPose(0, 5), thinking); // clamped
});

// ─── 3D or still image ───

test("3D only when WebGL works and the visitor hasn't asked for less motion or data", () => {
  assert.equal(chooseAvatarMode({ webgl: true, reducedMotion: false, saveData: false }), "3d");
  assert.equal(chooseAvatarMode({ webgl: false, reducedMotion: false, saveData: false }), "still");
  assert.equal(chooseAvatarMode({ webgl: true, reducedMotion: true, saveData: false }), "still");
  assert.equal(chooseAvatarMode({ webgl: true, reducedMotion: false, saveData: true }), "still");
});
