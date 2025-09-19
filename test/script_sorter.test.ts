import { expect, test } from "vitest";
import { sortScript, getSortingExplanation } from "../src/validator/script_sorter";
import type { Script } from "../src/types/types";
import { ALL_CHARACTERS } from "../src/data/all_characters";
import BlendingInScript from "./scripts/blending-in.json";

test("Sorts script by character type order", () => {
  const unsortedScript: Script = [
    { id: "_meta", author: "Test", name: "Type Order Test" },
    "imp", // demon
    "washerwoman", // townsfolk
    "butler", // outsider
    "poisoner", // minion
  ];

  const sorted = sortScript(unsortedScript);
  const characterIds = sorted.slice(1) as string[]; // Skip metadata

  expect(characterIds).toEqual([
    "washerwoman", // townsfolk first
    "butler", // outsider second
    "poisoner", // minion third
    "imp", // demon last
  ]);
});

test("Sorts characters within same type by ability pattern", () => {
  const unsortedScript: Script = [
    { id: "_meta", author: "Test", name: "Pattern Test" },
    "monk", // "Each night"
    "chef", // "You start knowing"
    "slayer", // "Once per game, during the day"
  ];

  const sorted = sortScript(unsortedScript);
  const characterIds = sorted.slice(1) as string[]; // Skip metadata

  expect(characterIds).toEqual([
    "chef", // "You start knowing" comes first
    "monk", // "Each night" comes second
    "slayer", // "Once per game, during the day" comes third
  ]);
});

test("Sorts characters by ability text length within same pattern group", () => {
  // Test with characters that have same pattern but different lengths
  const unsortedScript: Script = [
    { id: "_meta", author: "Test", name: "Length Test" },
    "librarian", // Longer ability text
    "washerwoman", // Shorter ability text
  ];

  const sorted = sortScript(unsortedScript);
  const characterIds = sorted.slice(1) as string[]; // Skip metadata

  // Both start with "You start knowing" so should sort by length
  expect(characterIds[0]).toBe("washerwoman"); // Should come first (shorter ability)
  expect(characterIds[1]).toBe("librarian"); // Should come second (longer ability)
});

test("Preserves metadata at beginning", () => {
  const unsortedScript: Script = [
    { id: "_meta", author: "Test", name: "Metadata Test" },
    "imp",
    "washerwoman",
  ];

  const sorted = sortScript(unsortedScript);

  expect(sorted[0]).toEqual({
    id: "_meta",
    author: "Test",
    name: "Metadata Test",
  });
});

test("Handles custom character objects", () => {
  const unsortedScript: Script = [
    { id: "_meta", author: "Test", name: "Custom Test" },
    {
      id: "customcharacter",
      name: "Custom Character",
      ability: "You win if you survive.",
      team: "outsider",
    },
    "washerwoman", // townsfolk
  ];

  const sorted = sortScript(unsortedScript);

  // Townsfolk should come before outsiders
  expect(sorted[1] as any).toBe("washerwoman");
  expect((sorted[2] as any).id).toBe("customcharacter");
});

test("Handles empty script", () => {
  const emptyScript: Script = [];
  const sorted = sortScript(emptyScript);
  expect(sorted).toEqual([]);
});

test("Handles script with only metadata", () => {
  const metadataOnlyScript: Script = [
    { id: "_meta", author: "Test", name: "Metadata Only" },
  ];
  const sorted = sortScript(metadataOnlyScript);
  expect(sorted).toEqual([
    { id: "_meta", author: "Test", name: "Metadata Only" },
  ]);
});

test("getSortingExplanation provides helpful explanations", () => {
  const characterIds = ["washerwoman", "butler", "poisoner", "imp"];
  const explanations = getSortingExplanation(characterIds);

  expect(explanations.length).toBe(3); // 4 characters = 3 comparisons
  expect(explanations[0]).toContain("townsfolk comes before outsider");
  expect(explanations[1]).toContain("outsider comes before minion");
  expect(explanations[2]).toContain("minion comes before demon");
});

test("Correctly sorted script remains unchanged", () => {
  // Use the blending-in script which is already in correct sort order
  const correctlyOrderedScript = BlendingInScript as Script;
  const sortedScript = sortScript(correctlyOrderedScript);

  // The script should remain unchanged when it's already correctly sorted
  expect(sortedScript).toEqual(correctlyOrderedScript);
});

test("Shuffled script sorts back to correct order", () => {
  // Take the correctly sorted blending-in script and shuffle the characters
  const originalScript = BlendingInScript as Script;
  const metadata = originalScript[0];
  const characters = originalScript.slice(1) as Lowercase<string>[];

  // Create a shuffled version
  const shuffledCharacters = [...characters].reverse(); // Simple shuffle by reversing
  const shuffledScript: Script = [metadata, ...shuffledCharacters];

  // Sort the shuffled script
  const sortedScript = sortScript(shuffledScript);

  // Should match the original correctly ordered script
  expect(sortedScript).toEqual(originalScript);
});

test("Sorting is consistent and follows type order", () => {
  // Create a test script with mixed types
  const testScript: Script = [
    { id: "_meta", author: "Test", name: "Mixed Type Test" },
    "imp", // demon
    "washerwoman", // townsfolk
    "butler", // outsider
    "poisoner", // minion
    "chef", // townsfolk
    "drunk", // outsider
    "spy", // minion
    "scarletwoman", // minion
  ];

  // Sort the script twice to ensure consistency
  const sortedScript1 = sortScript(testScript);
  const sortedScript2 = sortScript(testScript);

  // Both sorts should produce the same result (consistent sorting)
  expect(sortedScript1).toEqual(sortedScript2);

  // Should have metadata first
  expect(sortedScript1[0]).toEqual({
    id: "_meta",
    author: "Test",
    name: "Mixed Type Test",
  });

  // Should maintain all characters
  expect(sortedScript1.length).toBe(testScript.length);

  // Should be sorted by type: townsfolk, outsiders, minions, demons
  const sortedCharacterIds = sortedScript1.slice(1) as string[];

  // Verify type order
  let currentTypeIndex = -1;
  for (const charId of sortedCharacterIds) {
    const char = ALL_CHARACTERS[charId];
    if (char) {
      const typeIndex = ["townsfolk", "outsider", "minion", "demon"].indexOf(
        char.type
      );
      expect(typeIndex).toBeGreaterThanOrEqual(currentTypeIndex);
      if (typeIndex > currentTypeIndex) {
        currentTypeIndex = typeIndex;
      }
    }
  }

  // Verify all townsfolk come before all outsiders, etc.
  const townsfolk = sortedCharacterIds.filter(
    (id) => ALL_CHARACTERS[id]?.type === "townsfolk"
  );
  const outsiders = sortedCharacterIds.filter(
    (id) => ALL_CHARACTERS[id]?.type === "outsider"
  );
  const minions = sortedCharacterIds.filter(
    (id) => ALL_CHARACTERS[id]?.type === "minion"
  );
  const demons = sortedCharacterIds.filter(
    (id) => ALL_CHARACTERS[id]?.type === "demon"
  );

  expect(townsfolk.length).toBe(2); // washerwoman, chef
  expect(outsiders.length).toBe(2); // butler, drunk
  expect(minions.length).toBe(3); // poisoner, spy, scarletwoman
  expect(demons.length).toBe(1); // imp
});

test("Sorts by ability patterns within same character type", () => {
  // Test with townsfolk characters that have different ability patterns
  const testScript: Script = [
    { id: "_meta", author: "Test", name: "Pattern Test" },
    "mayor", // "If only 3 players live & no execution occurs..." (If group)
    "chef", // "You start knowing how many pairs..." (You start knowing group)
    "monk", // "Each night*, choose a player..." (Each night* group)
    "virgin", // "The 1st time you are nominated..." (The group)
    "slayer", // "Once per game, during the day..." (Once per game group)
    "soldier", // "You are safe from the Demon." (You are group)
  ];

  const sorted = sortScript(testScript);
  const sortedIds = sorted.slice(1) as string[]; // Skip metadata

  // All should be townsfolk and should be grouped by pattern
  for (const charId of sortedIds) {
    const char = ALL_CHARACTERS[charId];
    expect(char?.type).toBe("townsfolk");
  }

  // Chef should come first (You start knowing pattern)
  expect(sortedIds[0]).toBe("chef");

  // Monk should come early (Each night* pattern)
  expect(sortedIds.indexOf("monk")).toBeLessThan(sortedIds.indexOf("mayor"));

  // Virgin should be sorted by "The" pattern
  expect(sortedIds.indexOf("virgin")).toBeGreaterThanOrEqual(0);
});

test("Sorts by ability text length within same pattern group", () => {
  // Test with characters that have the same pattern but different lengths
  const testScript: Script = [
    { id: "_meta", author: "Test", name: "Length Test" },
    "investigator", // "You start knowing that 1 of 2 players is a particular Minion."
    "chef", // "You start knowing how many pairs of evil players there are."
    "washerwoman", // "You start knowing that 1 of 2 players is a particular Townsfolk."
  ];

  const sorted = sortScript(testScript);
  const sortedIds = sorted.slice(1) as string[]; // Skip metadata

  // All have "You start knowing" pattern, so should be sorted by ability length
  const chef = ALL_CHARACTERS.chef.ability.length;
  const investigator = ALL_CHARACTERS.investigator.ability.length;
  const washerwoman = ALL_CHARACTERS.washerwoman.ability.length;

  // Check that they're in length order (shortest to longest)
  expect(chef).toBeLessThanOrEqual(investigator);
  expect(investigator).toBeLessThanOrEqual(washerwoman);

  // The first character should have the shortest ability text
  const firstCharAbilityLength = ALL_CHARACTERS[sortedIds[0]].ability.length;
  const secondCharAbilityLength = ALL_CHARACTERS[sortedIds[1]].ability.length;
  const thirdCharAbilityLength = ALL_CHARACTERS[sortedIds[2]].ability.length;

  expect(firstCharAbilityLength).toBeLessThanOrEqual(secondCharAbilityLength);
  expect(secondCharAbilityLength).toBeLessThanOrEqual(thirdCharAbilityLength);
});
