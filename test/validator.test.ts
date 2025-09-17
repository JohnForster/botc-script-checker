import type { Script } from "../src/types/types";

import { expect, test } from "vitest";
import { validateScript } from "../src/validator/validator";
import * as Scripts from "./scripts";

test("Validates a script with too much droisoning", () => {
  const results = validateScript(Scripts.tooMuchDroisoning as Script);
  const droisoningResult = results.find((r) => r.id === "droisoning");
  expect(droisoningResult).toBeDefined();
  expect(droisoningResult?.severity).toBe("medium");
  expect(droisoningResult?.characters).toHaveLength(11);
  expect(droisoningResult?.message).toBe(
    "There are 11 sources of droisoning on this script. Consider removing some of them."
  );
});

test("Validates a script with single resurrection source", () => {
  const results = validateScript(Scripts.singleResurrection as Script);
  const resurrectionResult = results.find(
    (r) => r.id === "single-resurrection"
  );
  expect(resurrectionResult).toBeDefined();
  expect(resurrectionResult?.severity).toBe("medium");
  expect(resurrectionResult?.characters).toHaveLength(1);
  expect(resurrectionResult?.characters).toContain("professor");
  expect(resurrectionResult?.message).toBe(
    "There is only 1 source of resurrection on this script. Consider adding more resurrection sources to avoid hard-confirming characters."
  );
});

test("Validates a script with single extra death source", () => {
  const results = validateScript(Scripts.singleExtraDeath as Script);
  const extraDeathResult = results.find((r) => r.id === "single-extra-death");
  expect(extraDeathResult).toBeDefined();
  expect(extraDeathResult?.severity).toBe("medium");
  expect(extraDeathResult?.characters).toHaveLength(1);
  expect(extraDeathResult?.characters).toContain("tinker");
  expect(extraDeathResult?.message).toBe(
    "There is only 1 source of extra death at night on this script. Consider adding more extra death sources to avoid hard-confirming characters."
  );
});

test("Validates a script with character clashes", () => {
  const results = validateScript(Scripts.characterClash as Script);
  const clashResults = results.filter((r) => r.id === "character-clash");

  // Should find multiple clashes in this script that contains many clashing character pairs
  expect(clashResults).toHaveLength(17);

  // All clash results should have appropriate severity levels
  clashResults.forEach((result) => {
    expect(["low", "medium", "high"]).toContain(result.severity);
    expect(result.characters).toHaveLength(2);
  });
});

test("Official scripts pass validation", () => {
  const TBresults = validateScript(Scripts.troubleBrewing);
  expect.soft(TBresults).toHaveLength(0);
  expect(TBresults[0]).toBeUndefined();

  const BMRresults = validateScript(Scripts.badMoonRising);
  expect.soft(BMRresults).toHaveLength(0);
  expect(BMRresults[0]).toBeUndefined();

  const SnVresults = validateScript(Scripts.sectsAndViolets);
  expect.soft(BMRresults).toHaveLength(0);
  expect(SnVresults[0]).toBeUndefined();
});

test("Blending in is a good script", () => {
  const blendingInResults = validateScript(Scripts.blendingIn).filter(
    (r) => r.severity !== "low"
  );

  expect.soft(blendingInResults).toHaveLength(0);
  expect.soft(blendingInResults[0]).toBeUndefined();
});
