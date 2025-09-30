import { type Script, validateScript } from "botc-script-checker";
import { expect, test } from "vitest";

test("Balanced script with equal protection and extra death passes", () => {
  const balancedScript: Script = [
    { id: "_meta", author: "Test", name: "Balanced Protection Test" },
    "monk", // prevents-demon-kills
    "soldier", // prevents-demon-kills
    "sailor", // prevents-night-death
    "assassin", // extra-kill
    "tinker", // extra-death
    "moonchild", // extra-death
    "washerwoman", // no protection
    "imp", // demon
  ];

  const results = validateScript(balancedScript);
  const protectionErrors = results.filter(
    (r) => r.id === "too-much-protection"
  );
  expect(protectionErrors).toHaveLength(0);
});

test("Script with imbalance of 2 protection over extra death passes", () => {
  const scriptWithAllowedImbalance: Script = [
    { id: "_meta", author: "Test", name: "Allowed Imbalance Test" },
    "monk", // prevents-demon-kills
    "soldier", // prevents-demon-kills
    "sailor", // prevents-night-death
    "tealady", // prevents-night-death, prevents-execution, prevents-demon-kills
    "fool", // prevents-demon-kills, prevents-execution
    "assassin", // extra-kill
    "tinker", // extra-death
    "moonchild", // extra-death
    // 5 protection, 3 extra death = imbalance of 2 (allowed)
    "washerwoman", // no protection
    "imp", // demon
  ];

  const results = validateScript(scriptWithAllowedImbalance);
  const protectionErrors = results.filter(
    (r) => r.id === "too-much-protection"
  );
  expect(protectionErrors).toHaveLength(0);
});

test("Script with imbalance of 3+ protection over extra death triggers error", () => {
  const scriptWithTooMuchProtection: Script = [
    { id: "_meta", author: "Test", name: "Too Much Protection Test" },
    "monk", // prevents-demon-kills
    "soldier", // prevents-demon-kills
    "sailor", // prevents-night-death
    "tealady", // prevents-night-death, prevents-execution, prevents-demon-kills
    "fool", // prevents-demon-kills, prevents-execution
    "innkeeper", // prevents-night-death, prevents-demon-kills
    "assassin", // extra-kill
    "tinker", // extra-death
    "moonchild", // extra-death
    // 6 protection, 3 extra death = imbalance of 3 (too much)
    "washerwoman", // no protection
    "imp", // demon
  ];

  const results = validateScript(scriptWithTooMuchProtection);
  const protectionErrors = results.filter(
    (r) => r.id === "too-much-protection"
  );

  expect(protectionErrors).toHaveLength(1);
  const error = protectionErrors[0];
  expect(error.severity).toBe("medium");
  expect(error.characters).toEqual([
    "monk",
    "soldier",
    "sailor",
    "tealady",
    "fool",
    "innkeeper",
  ]);
});

test("Script with no extra death characters and 3+ protection triggers error", () => {
  const scriptWithNoExtraDeath: Script = [
    { id: "_meta", author: "Test", name: "No Extra Death Test" },
    "monk", // prevents-demon-kills
    "soldier", // prevents-demon-kills
    "sailor", // prevents-night-death
    // 3 protection, 0 extra death = imbalance of 3 (too much)
    "washerwoman", // no protection
    "imp", // demon
  ];

  const results = validateScript(scriptWithNoExtraDeath);
  const protectionErrors = results.filter(
    (r) => r.id === "too-much-protection"
  );

  expect(protectionErrors).toHaveLength(1);
  const error = protectionErrors[0];
  expect(error.severity).toBe("medium");
  expect(error.characters).toEqual(["monk", "soldier", "sailor"]);
});

test("Empty script has no protection error", () => {
  const emptyScript: Script = [];
  const results = validateScript(emptyScript);

  const protectionErrors = results.filter(
    (r) => r.id === "too-much-protection"
  );
  expect(protectionErrors).toHaveLength(0);
});

test("Script with no protection characters has no error", () => {
  const scriptWithNoProtection: Script = [
    { id: "_meta", author: "Test", name: "No Protection Test" },
    "washerwoman", // no protection
    "chef", // no protection
    "butler", // no protection
    "poisoner", // no protection
    "imp", // demon
  ];

  const results = validateScript(scriptWithNoProtection);
  const protectionErrors = results.filter(
    (r) => r.id === "too-much-protection"
  );
  expect(protectionErrors).toHaveLength(0);
});
