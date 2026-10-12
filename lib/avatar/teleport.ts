// Buu's "teleport" to another page: pose, vanish, page change, reappear.
// Pure timing and decision logic (no React, no three.js), so it can be unit-tested.

export type TeleportPhase = "idle" | "pose" | "vanish" | "travel" | "appear";

/**
 * - full:    desktop, the whole effect inside the open panel.
 * - phone:   the panel fills the screen, so Buu vanishes, the panel closes and the page changes
 *            in view; the corner button flashes as Buu "lands".
 * - instant: "reduce motion" is on: just change the page.
 */
export type TeleportStyle = "full" | "phone" | "instant";

export const TELEPORT_MS = {
  pose: 650, // fingers to forehead, eyes closed
  vanish: 380, // flash, squeeze into a line, gone
  travelMin: 280, // the page wipe lasts at least this long...
  travelMax: 4000, // ...and at most this long, even if the new page is slow
  appear: 520, // flash, stretch back into shape
} as const;

export function teleportStyle(env: { reducedMotion: boolean; phone: boolean }): TeleportStyle {
  if (env.reducedMotion) return "instant";
  return env.phone ? "phone" : "full";
}

/** The phases to play, with how long each lasts (travel = the minimum; it also waits for the page). */
export function teleportPlan(style: TeleportStyle): { phase: Exclude<TeleportPhase, "idle">; ms: number }[] {
  if (style === "instant") return [{ phase: "travel", ms: 0 }];
  const plan: { phase: Exclude<TeleportPhase, "idle">; ms: number }[] = [
    { phase: "pose", ms: TELEPORT_MS.pose },
    { phase: "vanish", ms: TELEPORT_MS.vanish },
    { phase: "travel", ms: TELEPORT_MS.travelMin },
    { phase: "appear", ms: TELEPORT_MS.appear },
  ];
  return plan;
}

/** When Buu should start "saying" the reply: once it has reappeared (or straight away if instant). */
export function talkDelayMs(style: TeleportStyle): number {
  if (style === "instant") return 0;
  return TELEPORT_MS.pose + TELEPORT_MS.vanish + TELEPORT_MS.travelMin + TELEPORT_MS.appear;
}

/** Is a teleport to `target` worth doing from `current`? Never to the page you're already on. */
export function shouldTeleport(target: string, current: string | null): boolean {
  const normalise = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);
  return current === null || normalise(target) !== normalise(current);
}
