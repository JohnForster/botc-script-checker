import type { Script } from "../types/types";
import { ALL_CHARACTERS } from "../data/all_characters";

/**
 * Script sorting utility that follows the official Blood on the Clocktower sorting rules.
 *
 * Sorting order:
 * 1. By character type: Townsfolk → Outsiders → Minions → Demons
 * 2. By ability text pattern groups (specific order from sorting.txt)
 * 3. By ability text length (shortest to longest)
 * 4. By character name length (if ability text length is same)
 * 5. Alphabetically by name (if both lengths are same)
 */

// Character type priority order
const CHARACTER_TYPE_ORDER = {
  townsfolk: 0,
  outsider: 1,
  minion: 2,
  demon: 3,
  traveller: 4, // Not mentioned in sorting.txt but included for completeness
  fabled: 5, // Not mentioned in sorting.txt but included for completeness
} as const;

// Ability text pattern groups in priority order (from sorting.txt)
const ABILITY_PATTERN_GROUPS = [
  // Group 1: Time-based abilities
  "You start knowing",
  "At night",
  "Each dusk*",
  "Each dusk",
  "Each night",
  "Each night*",
  "Each day",
  "Once per game, at night",
  "Once per game, at night*",
  "Once per game, during the day",
  "Once per game",
  "On your 1st night",
  "On your 1st day",
  "On",

  // Group 2: Information/state abilities
  "You think",
  "You are",
  "You have",
  "You do not know",
  "You might",
  "You",

  // Group 3: Death-triggered abilities
  "When you die",
  "When you learn that you died",
  "When",

  // Group 4: Conditional abilities
  "If you die",
  "If you died",
  'If you are "mad"',
  "If you",
  "If the Demon dies",
  "If the Demon kills",
  "If the Demon",
  "If both",
  "If there are 5 or more players alive",
  "If",

  // Group 5: Player-affecting abilities
  "All players",
  "All",

  // Group 6: Specific triggers
  "The 1st time",
  "The",

  // Group 7: Alignment-based
  "Good",
  "Evil",
  "Players",
  "Minions",
] as const;

/**
 * Get the priority index for a character type
 */
function getCharacterTypePriority(type: string): number {
  return CHARACTER_TYPE_ORDER[type as keyof typeof CHARACTER_TYPE_ORDER] ?? 999;
}

/**
 * Get the ability pattern group priority for a character's ability text
 * Check for more specific patterns first to avoid incorrect matching
 */
function getAbilityPatternPriority(ability: string): number {
  // Create a copy of patterns sorted by length (longest first) for matching
  const patternsForMatching = ABILITY_PATTERN_GROUPS.map((pattern, index) => ({
    pattern,
    originalIndex: index,
  })).sort((a, b) => b.pattern.length - a.pattern.length);

  for (const { pattern, originalIndex } of patternsForMatching) {
    if (ability.startsWith(pattern)) {
      return originalIndex;
    }
  }
  // If no pattern matches, put it at the end to be sorted by length only
  return ABILITY_PATTERN_GROUPS.length;
}

/**
 * Sort characters according to official Blood on the Clocktower sorting rules
 */
function sortCharacters(characterIds: string[]): string[] {
  return characterIds.sort((a, b) => {
    const charA = ALL_CHARACTERS[a];
    const charB = ALL_CHARACTERS[b];

    if (!charA || !charB) {
      // If character not found, sort unknown characters to the end
      if (!charA && !charB) return a.localeCompare(b);
      return !charA ? 1 : -1;
    }

    // 1. Sort by character type
    const typeA = getCharacterTypePriority(charA.type);
    const typeB = getCharacterTypePriority(charB.type);
    if (typeA !== typeB) {
      return typeA - typeB;
    }

    // 2. Sort by ability pattern group
    const patternA = getAbilityPatternPriority(charA.ability);
    const patternB = getAbilityPatternPriority(charB.ability);
    if (patternA !== patternB) {
      return patternA - patternB;
    }

    // 3. Sort by ability text length
    const abilityLengthA = charA.ability.length;
    const abilityLengthB = charB.ability.length;
    if (abilityLengthA !== abilityLengthB) {
      return abilityLengthA - abilityLengthB;
    }

    // 4. Sort by character name length
    const nameLengthA = charA.name.length;
    const nameLengthB = charB.name.length;
    if (nameLengthA !== nameLengthB) {
      return nameLengthA - nameLengthB;
    }

    // 5. Sort alphabetically by name
    return charA.name.localeCompare(charB.name);
  });
}

/**
 * Sort a Blood on the Clocktower script according to official sorting rules.
 * Preserves metadata (_meta) and only sorts character entries.
 */
export function sortScript(script: Script): Script {
  const result: Script = [];
  const characterIds: string[] = [];

  // Separate metadata from characters
  for (const element of script) {
    if (typeof element === "string") {
      characterIds.push(element);
    } else if (element.id === "_meta") {
      // Keep metadata at the beginning
      result.push(element);
    } else {
      // Custom character objects - extract their IDs
      characterIds.push(element.id);
    }
  }

  // Sort character IDs
  const sortedCharacterIds = sortCharacters(characterIds);

  // Add sorted characters back to result
  for (const charId of sortedCharacterIds) {
    // Find the original element to preserve custom character objects
    const originalElement = script.find(
      (el) => (typeof el === "string" ? el : el.id) === charId
    );
    if (originalElement) {
      result.push(originalElement);
    }
  }

  return result;
}

/**
 * Utility function to get a human-readable explanation of why characters are sorted in a specific order
 */
export function getSortingExplanation(characterIds: string[]): string[] {
  const explanations: string[] = [];

  for (let i = 0; i < characterIds.length - 1; i++) {
    const charA = ALL_CHARACTERS[characterIds[i]];
    const charB = ALL_CHARACTERS[characterIds[i + 1]];

    if (!charA || !charB) continue;

    const typeA = getCharacterTypePriority(charA.type);
    const typeB = getCharacterTypePriority(charB.type);

    if (typeA !== typeB) {
      explanations.push(
        `${charA.name} comes before ${charB.name} because ${charA.type} comes before ${charB.type} in type order.`
      );
    } else {
      const patternA = getAbilityPatternPriority(charA.ability);
      const patternB = getAbilityPatternPriority(charB.ability);

      if (patternA !== patternB) {
        explanations.push(
          `${charA.name} comes before ${charB.name} because "${charA.ability
            .split(" ")
            .slice(0, 3)
            .join(" ")}..." pattern has higher priority.`
        );
      } else if (charA.ability.length !== charB.ability.length) {
        explanations.push(
          `${charA.name} comes before ${charB.name} because its ability text is shorter (${charA.ability.length} vs ${charB.ability.length} characters).`
        );
      } else if (charA.name.length !== charB.name.length) {
        explanations.push(
          `${charA.name} comes before ${charB.name} because its name is shorter (${charA.name.length} vs ${charB.name.length} characters).`
        );
      } else {
        explanations.push(
          `${charA.name} comes before ${charB.name} alphabetically.`
        );
      }
    }
  }

  return explanations;
}
