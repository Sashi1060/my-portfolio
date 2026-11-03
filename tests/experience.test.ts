import assert from "node:assert/strict";
import test from "node:test";
import { getProfessionalExperience } from "../lib/experience.ts";

test("counts professional experience from December 2023", () => {
  assert.deepEqual(getProfessionalExperience(new Date("2026-11-03T06:00:00Z")), { years: 2, months: 11 });
  assert.deepEqual(getProfessionalExperience(new Date("2023-12-15T06:00:00Z")), { years: 0, months: 0 });
});

test("rolls over at the start of December in India", () => {
  assert.deepEqual(getProfessionalExperience(new Date("2026-11-30T18:29:59Z")), { years: 2, months: 11 });
  assert.deepEqual(getProfessionalExperience(new Date("2026-11-30T18:30:00Z")), { years: 3, months: 0 });
  assert.deepEqual(getProfessionalExperience(new Date("2027-01-01T00:00:00Z")), { years: 3, months: 1 });
});

test("does not show negative experience before the start month", () => {
  assert.deepEqual(getProfessionalExperience(new Date("2023-11-01T00:00:00Z")), { years: 0, months: 0 });
});
