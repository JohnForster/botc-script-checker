import { expect, test } from "vitest";
import * as Scripts from "./scripts";
import { validateScript, type Script } from "botc-script-checker";

test("Validates a script with too much misinformation", () => {
  const results = validateScript(Scripts.tooMuchDroisoning as Script);
  const misinfoResult = results.find((r) => r.id === "misinfo");
  expect(misinfoResult).toBeDefined();
  expect(misinfoResult?.severity).toBe("medium");
  expect(misinfoResult?.characters).toHaveLength(11);
  expect(misinfoResult?.message).toBe(
    "There are 11 sources of misinformation on this script. Consider removing some of them."
  );
});

test("Validates a script with too little misinformation", () => {
  // Create a script with only 1 misinformation source
  const lowMisinfoScript: Script = [
    { id: "_meta", author: "Test", name: "Low Misinfo Test" },
    "washerwoman", // no misinfo
    "librarian", // no misinfo
    "investigator", // no misinfo
    "chef", // no misinfo
    "empath", // no misinfo
    "poisoner", // causes misinfo
    "imp",
  ];

  const results = validateScript(lowMisinfoScript);
  const misinfoResult = results.find((r) => r.id === "misinfo");
  expect(misinfoResult).toBeDefined();
  expect(misinfoResult?.severity).toBe("low");
  expect(misinfoResult?.characters).toHaveLength(1);
  expect(misinfoResult?.characters).toContain("poisoner");
  expect(misinfoResult?.message).toBe(
    "There is only 1 source of misinformation on this script. Consider adding more, or using the Fibbin fabled."
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

  expect(clashResults).toHaveLength(16);
});

test("Validates a script with insufficient outsider modification", () => {
  // Create a script with only 1 outsider modification source
  const lowOutsiderModScript: Script = [
    { id: "_meta", author: "Test", name: "Low Outsider Mod Test" },
    "washerwoman",
    "librarian",
    "investigator",
    "chef",
    "empath",
    "godfather", // has outsider modification
    "poisoner",
    "imp",
  ];

  const results = validateScript(lowOutsiderModScript);
  const outsiderModResult = results.find(
    (r) => r.id === "outsider-modification"
  );
  expect(outsiderModResult).toBeDefined();
  expect(outsiderModResult?.severity).toBe("medium");
  expect(outsiderModResult?.characters).toHaveLength(1);
  expect(outsiderModResult?.characters).toContain("godfather");
  expect(outsiderModResult?.message).toBe(
    "If there is only one source of outsider modification, consider including more shy outsiders to hide this (eg. Mutant, Sweetheart, Barber)."
  );
});

test("Validates a script with no outsider modification", () => {
  // Create a script with 0 outsider modification sources
  const noOutsiderModScript: Script = [
    { id: "_meta", author: "Test", name: "No Outsider Mod Test" },
    "washerwoman",
    "librarian",
    "investigator",
    "chef",
    "empath",
    "poisoner",
    "imp",
  ];

  const results = validateScript(noOutsiderModScript);
  const outsiderModResult = results.find(
    (r) => r.id === "outsider-modification"
  );
  expect(outsiderModResult).toBeDefined();
  expect(outsiderModResult?.severity).toBe("medium");
  expect(outsiderModResult?.characters).toHaveLength(0);
  expect(outsiderModResult?.message).toBe(
    "Without any outsider modification, the evil team will struggle to bluff outsiders."
  );
});

test("Validates a script with two extra evil sources", () => {
  // Create a script with 2 characters that can add evil players
  const twoExtraEvilScript: Script = [
    { id: "_meta", author: "Test", name: "Two Extra Evil Test" },
    "washerwoman",
    "librarian",
    "investigator",
    "chef",
    "empath",
    "bountyhunter", // can add evil
    "mezepheles", // can add evil
    "poisoner",
    "imp",
  ];

  const results = validateScript(twoExtraEvilScript);
  const extraEvilResult = results.find((r) => r.id === "extra-evil");
  expect(extraEvilResult).toBeDefined();
  expect(extraEvilResult?.severity).toBe("medium");
  expect(extraEvilResult?.characters).toHaveLength(2);
  expect(extraEvilResult?.characters).toContain("bountyhunter");
  expect(extraEvilResult?.characters).toContain("mezepheles");
  expect(extraEvilResult?.message).toBe(
    "There are 2 characters that can add extra evil players. This may make the game unbalanced in favor of evil, consider adding the Spirit of Ivory to prevent this."
  );
});

test("Validates a script with three or more extra evil sources", () => {
  // Create a script with 3 characters that can add evil players
  const threeExtraEvilScript: Script = [
    { id: "_meta", author: "Test", name: "Three Extra Evil Test" },
    "washerwoman",
    "librarian",
    "investigator",
    "chef",
    "empath",
    "bountyhunter", // can add evil
    "ogre", // can add evil
    "mezepheles", // can add evil
    "poisoner",
    "imp",
  ];

  const results = validateScript(threeExtraEvilScript);
  const extraEvilResult = results.find((r) => r.id === "extra-evil");
  expect(extraEvilResult).toBeDefined();
  expect(extraEvilResult?.severity).toBe("high");
  expect(extraEvilResult?.characters).toHaveLength(3);
  expect(extraEvilResult?.characters).toContain("bountyhunter");
  expect(extraEvilResult?.characters).toContain("ogre");
  expect(extraEvilResult?.characters).toContain("mezepheles");
  expect(extraEvilResult?.message).toBe(
    "There are 3 characters that can add extra evil players. This is unbalanced in favor of evil. Consider adding the Spirit of Ivory to prevent this."
  );
});

test("Extra evil players rule does not activate with Spirit of Ivory", () => {
  // Create a script with 3 extra evil characters but also Spirit of Ivory
  const spiritOfIvoryScript: Script = [
    { id: "_meta", author: "Test", name: "Spirit of Ivory Test" },
    "washerwoman",
    "librarian",
    "investigator",
    "chef",
    "empath",
    "bountyhunter", // can add evil
    "ogre", // can add evil
    "mezepheles", // can add evil
    "spiritofivory", // prevents extra evil rule
    "poisoner",
    "imp",
  ];

  const results = validateScript(spiritOfIvoryScript);
  const extraEvilResult = results.find((r) => r.id === "extra-evil");
  // Should not trigger because Spirit of Ivory is present
  expect(extraEvilResult).toBeUndefined();
});

test("Validates a script with confirmation chain", () => {
  // Create a script with many self-confirming/character-confirming roles (need >6)
  const confirmationChainScript: Script = [
    { id: "_meta", author: "Test", name: "Confirmation Chain Test" },
    "washerwoman", // character-confirmation
    "librarian", // character-confirmation
    "undertaker", // character-confirmation
    "ravenkeeper", // character-confirmation
    "dreamer", // character-confirmation
    "cannibal", // character-confirmation
    "juggler", // character-confirmation
    "nightwatchman", // self-confirming
    "poisoner",
    "imp",
  ];

  const results = validateScript(confirmationChainScript);
  const confirmationResult = results.find((r) => r.id === "confirmation-chain");
  expect(confirmationResult).toBeDefined();
  expect(confirmationResult?.severity).toBe("medium");
  expect(confirmationResult?.characters.length).toBeGreaterThan(6);
});

test("Validates a script with Legion and overpowered characters", () => {
  // Create a script with Legion and characters that are overpowered with it
  const legionScript: Script = [
    { id: "_meta", author: "Test", name: "Legion Test" },
    "slayer", // overpowered with Legion
    "artist", // overpowered without Vortox
    "chef", // overpowered without Vortox
    "empath", // overpowered without Vortox
    "noble", // overpowered without Vortox
    "poisoner",
    "legion",
  ];

  const results = validateScript(legionScript);
  const legionResult = results.find((r) => r.id === "legion");
  expect(legionResult).toBeDefined();
  expect(legionResult?.severity).toBe("high");
  expect(legionResult?.characters).toContain("legion");
  expect(legionResult?.characters).toContain("slayer");
  expect(legionResult?.characters).toContain("artist");
  expect(legionResult?.message).toBe(
    "These characters are overpowered in Legion scripts. Consider removing these characters."
  );
});

test("Validates a script with only good execution protection", () => {
  // Create a script where all execution protection is good-aligned
  const onlyGoodExecutionProtectionScript: Script = [
    {
      id: "_meta",
      author: "Test",
      name: "Only Good Execution Protection Test",
    },
    "washerwoman",
    "librarian",
    "investigator",
    "chef",
    "empath",
    "fool", // prevents-execution (townsfolk)
    "pacifist", // prevents-execution (townsfolk)
    "poisoner",
    "imp",
  ];

  const results = validateScript(onlyGoodExecutionProtectionScript);
  const executionProtectionResult = results.find(
    (r) => r.id === "only-good-execution-protection"
  );
  expect(executionProtectionResult).toBeDefined();
  expect(executionProtectionResult?.severity).toBe("medium");
  expect(executionProtectionResult?.characters).toContain("fool");
  expect(executionProtectionResult?.characters).toContain("pacifist");
});

test("Validates requirements constraints", () => {
  // Test acrobat requirements - needs droisoning characters
  const scriptWithoutDroisoning: Script = [
    { id: "_meta", author: "Test", name: "Acrobat Without Droisoning Test" },
    "acrobat",
    "washerwoman",
    "librarian",
    "investigator",
    "chef",
    "empath",
    "imp",
  ];

  const results = validateScript(scriptWithoutDroisoning);
  const requirementResults = results.filter((r) => r.id === "requirements");

  expect(requirementResults).toHaveLength(1);
  expect(requirementResults[0].severity).toBe("high");
  expect(requirementResults[0].characters).toContain("acrobat");
  expect(requirementResults[0].message).toBe(
    "The Acrobat is useless in a script without droisoning."
  );
});

test("Validates baron outsider requirements", () => {
  // Test baron requirements - needs >= 4 outsiders
  const scriptWithFewOutsiders: Script = [
    { id: "_meta", author: "Test", name: "Baron Few Outsiders Test" },
    "baron",
    "washerwoman",
    "librarian",
    "investigator",
    "chef",
    "empath",
    "butler", // outsider
    "recluse", // outsider
    "imp",
  ];

  const results = validateScript(scriptWithFewOutsiders);
  const requirementResults = results.filter((r) => r.id === "requirements");

  expect(requirementResults).toHaveLength(1);
  expect(requirementResults[0].severity).toBe("medium");
  expect(requirementResults[0].characters).toContain("baron");
  expect(requirementResults[0].message).toContain(
    "If there are fewer than 4 outsiders"
  );
});

test("Validates suggestions constraints", () => {
  // Test acrobat suggestions - recommends > 4 droisoning characters
  const scriptWithLittleDroisoning: Script = [
    { id: "_meta", author: "Test", name: "Acrobat Little Droisoning Test" },
    "acrobat",
    "washerwoman",
    "librarian",
    "investigator",
    "chef",
    "empath",
    "poisoner", // causes droisoning (1 source)
    "imp",
  ];

  const results = validateScript(scriptWithLittleDroisoning);
  const suggestionResults = results.filter((r) => r.id === "suggestions");

  expect(suggestionResults).toHaveLength(1);
  expect(suggestionResults[0].severity).toBe("medium");
  expect(suggestionResults[0].characters).toContain("acrobat");
  expect(suggestionResults[0].message).toBe(
    "The Acrobat doesn't function well in scripts without much droisoning."
  );
});

test("Requirements and suggestions pass when constraints are met", () => {
  // Test script that meets acrobat requirements and suggestions (needs > 4 droisoning characters)
  const scriptWithEnoughDroisoning: Script = [
    { id: "_meta", author: "Test", name: "Acrobat With Droisoning Test" },
    "acrobat",
    "washerwoman",
    "librarian",
    "investigator",
    "chef",
    "courtier", // causes droisoning
    "goon", // causes droisoning
    "poisoner", // causes droisoning
    "pukka", // causes droisoning
    "minstrel", // causes droisoning
    "imp",
  ];

  const results = validateScript(scriptWithEnoughDroisoning);
  const constraintResults = results.filter(
    (r) => r.id === "requirements" || r.id === "suggestions"
  );

  // Should have no constraint violations for acrobat
  const acrobatConstraintResults = constraintResults.filter((r) =>
    r.characters.includes("acrobat")
  );
  expect(acrobatConstraintResults).toHaveLength(0);
});

test("Suggestions pass when multiple tags are given", () => {
  const scriptWithMixedTags: Script = [
    { id: "_meta", author: "Test", name: "Acrobat With Droisoning Test" },
    "tealady", // Prevent demon kill
    "sailor", // Prevent demon kill
    "innkeeper", // Prevent demon kill
    "tinker", // Extra Death
    "assassin", // Extra Death
    "po", // Prevent demon kill, Extra Death
    "zombuul",
  ];

  const results = validateScript(scriptWithMixedTags);
  const constraintResults = results.filter(
    (r) =>
      r.id === "requirements" ||
      (r.id === "suggestions" && r.characters.includes("zombuul"))
  );
  expect(constraintResults.length).toEqual(1);

  scriptWithMixedTags.push("monk"); // Add a monk, this should fix the problem.
  const results2 = validateScript(scriptWithMixedTags);
  const constraintResults2 = results2.filter(
    (r) =>
      r.id === "requirements" ||
      (r.id === "suggestions" && r.characters.includes("zombuul"))
  );
  expect(constraintResults2.length).toEqual(0);
});

test("Validates a script with too much protection imbalance", () => {
  // Create a script with protection imbalance > 2
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
  const protectionResult = results.find((r) => r.id === "too-much-protection");

  expect(protectionResult).toBeDefined();
  expect(protectionResult?.severity).toBe("medium");
  expect(protectionResult?.characters).toHaveLength(6);
  expect(protectionResult?.characters).toEqual([
    "monk",
    "soldier",
    "sailor",
    "tealady",
    "fool",
    "innkeeper",
  ]);
  expect(protectionResult?.message).include("protection characters");
});

test("Validates a script with acceptable protection balance", () => {
  // Create a script with protection imbalance <= 2 (should pass)
  const scriptWithAcceptableProtection: Script = [
    { id: "_meta", author: "Test", name: "Acceptable Protection Test" },
    "monk", // prevents-demon-kills
    "soldier", // prevents-demon-kills
    "sailor", // prevents-night-death
    "tealady", // prevents-night-death, prevents-execution, prevents-demon-kills
    "fool", // prevents-demon-kills, prevents-execution
    "assassin", // extra-kill
    "tinker", // extra-death
    "moonchild", // extra-death
    // 5 protection, 3 extra death = imbalance of 2 (acceptable)
    "washerwoman", // no protection
    "butler", // no protection
    "poisoner", // no protection
    "imp", // demon
  ];

  const results = validateScript(scriptWithAcceptableProtection);
  const protectionResult = results.find((r) => r.id === "too-much-protection");

  expect(protectionResult).toBeUndefined();
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

test.skip("Blending in is a good script", () => {
  const blendingInResults = validateScript(Scripts.blendingIn).filter(
    (r) => r.severity !== "low"
  );

  expect.soft(blendingInResults).toHaveLength(0);
  expect.soft(blendingInResults[0]).toBeUndefined();
});
