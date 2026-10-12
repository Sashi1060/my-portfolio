import { test } from "node:test";
import assert from "node:assert/strict";

import { TELEPORT_MS, shouldTeleport, talkDelayMs, teleportPlan, teleportStyle } from "../lib/avatar/teleport.ts";
import { cleanNavigation, isSitePath } from "../lib/assistant/types.ts";

test("style: full on desktop, phone on small screens, instant with reduce motion", () => {
  assert.equal(teleportStyle({ reducedMotion: false, phone: false }), "full");
  assert.equal(teleportStyle({ reducedMotion: false, phone: true }), "phone");
  assert.equal(teleportStyle({ reducedMotion: true, phone: false }), "instant");
  assert.equal(teleportStyle({ reducedMotion: true, phone: true }), "instant");
});

test("full teleport: pose, vanish, travel, appear, in that order", () => {
  assert.deepEqual(
    teleportPlan("full").map((step) => step.phase),
    ["pose", "vanish", "travel", "appear"],
  );
  assert.deepEqual(teleportPlan("phone").map((step) => step.phase), ["pose", "vanish", "travel", "appear"]);
});

test("instant teleport only changes the page", () => {
  assert.deepEqual(teleportPlan("instant"), [{ phase: "travel", ms: 0 }]);
  assert.equal(talkDelayMs("instant"), 0);
});

test("the whole effect stays short (under 2.5 s) and Buu talks once it has reappeared", () => {
  const total = teleportPlan("full").reduce((sum, step) => sum + step.ms, 0);
  assert.ok(total < 2500, `${total} ms`);
  assert.equal(talkDelayMs("full"), total);
  assert.ok(TELEPORT_MS.travelMax >= 2000); // a slow page still finishes the effect
});

test("never teleports to the page you're already on", () => {
  assert.equal(shouldTeleport("/publications", "/publications"), false);
  assert.equal(shouldTeleport("/publications", "/publications/"), false);
  assert.equal(shouldTeleport("/publications", "/about"), true);
  assert.equal(shouldTeleport("/", "/about"), true);
  assert.equal(shouldTeleport("/about", null), true);
});

test("only plain paths on this site are allowed", () => {
  for (const path of ["/", "/about", "/projects/orion-ai-desktop"]) assert.ok(isSitePath(path), path);
  for (const path of ["", "about", "//evil.example", "https://evil.example", "javascript:alert(1)", "/About", "/a?b", "/a#b", "/../x", 5, null]) {
    assert.equal(isSitePath(path), false, String(path));
  }
});

test("cleanNavigation keeps valid objects and trims labels", () => {
  assert.deepEqual(cleanNavigation({ path: "/resume", label: "  Resume ", mode: "offer", extra: 1 }), {
    path: "/resume",
    label: "Resume",
    mode: "offer",
  });
  assert.equal(cleanNavigation(null), null);
  assert.equal(cleanNavigation({ path: "/resume", label: "Resume" }), null);
  assert.equal(cleanNavigation({ path: "/resume", label: "x".repeat(500), mode: "auto" })?.label.length, 60);
});
