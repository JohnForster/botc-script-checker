import { expect, test } from "vitest";
import BlendingInScript from "./scripts/blending-in.json";
import { type Script, validateScript } from "botc-script-checker";

test("Correctly ordered script has no script order validation error", () => {
  // Use the correctly ordered blending-in script
  const correctlyOrderedScript = BlendingInScript as Script;
  const results = validateScript(correctlyOrderedScript);

  // Should not have any script-order validation errors
  const scriptOrderErrors = results.filter((r) => r.id === "script-order");
  expect(scriptOrderErrors).toHaveLength(0);
});

test("Incorrectly ordered script triggers script order validation error", () => {
  // Create a script with incorrect order (demon before townsfolk)
  const incorrectlyOrderedScript: Script = [
    { id: "_meta", author: "Test", name: "Incorrect Order Test" },
    "imp", // demon - should come last
    "washerwoman", // townsfolk - should come first
    "butler", // outsider
    "poisoner", // minion
  ];

  const results = validateScript(incorrectlyOrderedScript);

  // Should have exactly one script-order validation error
  const scriptOrderErrors = results.filter((r) => r.id === "script-order");
  expect(scriptOrderErrors).toHaveLength(1);

  const error = scriptOrderErrors[0];
  expect(error.severity).toBe("low");
  expect(error.message).toContain("not in the correct sort order");
  expect(error.message).toContain(
    "The script is not in the correct sort order."
  );
  expect(error.characters).toEqual([]);
});

test("Empty script has no script order validation error", () => {
  const emptyScript: Script = [];
  const results = validateScript(emptyScript);

  // Should not have any script-order validation errors
  const scriptOrderErrors = results.filter((r) => r.id === "script-order");
  expect(scriptOrderErrors).toHaveLength(0);
});

test("Script with only metadata has no script order validation error", () => {
  const metadataOnlyScript: Script = [
    { id: "_meta", author: "Test", name: "Metadata Only" },
  ];
  const results = validateScript(metadataOnlyScript);

  // Should not have any script-order validation errors
  const scriptOrderErrors = results.filter((r) => r.id === "script-order");
  expect(scriptOrderErrors).toHaveLength(0);
});
