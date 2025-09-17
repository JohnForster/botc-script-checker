import type { Script } from "../src/types/types";

import { expect, test } from "vitest";
import { validateScript } from "../src/validator/validator";
import * as Scripts from "./scripts";

test("Validates a script with too much droisoning", () => {
  const results = validateScript(Scripts.tooMuchDroisoning as Script);
  const droisoningResult = results.find((r) => r.id === "droisoning");
  expect(droisoningResult).toBeDefined();
  expect(droisoningResult?.severity).toBe("warning");
  expect(droisoningResult?.characters).toHaveLength(11);
  expect(droisoningResult?.message).toBe(
    "There are 11 sources of droisoning on this script. Consider removing some of them."
  );
});

test("Official scripts pass validation", () => {
  const officialScripts: Script[] = [
    Scripts.sectsAndViolets,
    Scripts.badMoonRising,
    Scripts.sectsAndViolets,
  ];
  for (const script of officialScripts) {
    const results = validateScript(script);
    expect(results[0]).toBeUndefined();
  }
});
