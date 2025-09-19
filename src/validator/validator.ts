import type { Script } from "../types/types";
// import { considerations } from "../data/considerations.ts";
import { getCharacters } from "../types/script.ts";
import type { CharacterID } from "../types/schema.ts";
import { considerations } from "../data/considerations.ts";
import { ALL_CHARACTERS } from "../data/all_characters.ts";
import type { Constraint } from "../types/considerations.ts";

export { ALL_CHARACTERS };

export const FAILURES = {
  misinfo: "Misinformation",
  legion: "Legion Clashes",
  "single-resurrection": "Resurrection",
  "single-extra-death": "Extra Death",
  "confirmation-chain": "Confirmation Chain",
  "character-clash": "Character Clash",
  "outsider-modification": "Outsider Modification",
  "extra-evil": "Extra Evil Players",
  "only-good-execution-protection": "Only Good Execution Protection",
  suggestions: "Character Suggestion",
  requirements: "Character Requirement Not Met",
};

export type FailureID = keyof typeof FAILURES;

export type ValidationResult = {
  severity: "high" | "medium" | "low";
  id: FailureID;
  message: string;
  characters: string[];
};

const CHECKS: ((
  script: Script
) => (ValidationResult | null) | ValidationResult[])[] = [
  misinformation,
  singleResurrectionSource,
  singleExtraDeathSource,
  confirmationChain,
  characterClashes,
  outsiderModification,
  extraEvilPlayers,
  legion,
  onlyGoodExecutionProtection,
  checkRequirements,
  checkSuggestions,
];

export function validateScript(script: Script): ValidationResult[] {
  const results: ValidationResult[] = [];
  for (const check of CHECKS) {
    const result = check(script);
    if (Array.isArray(result)) {
      results.push(...result);
    } else if (result) {
      results.push(result);
    }
  }
  results.sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
  return results;
}

function misinformation(script: Script): ValidationResult | null {
  const MAX_MISINFORMATION = 6;
  const MIN_MISINFORMATION = 3;
  const chars = getCharacters(script);
  const misinfoChars = chars.filter(
    (char) =>
      considerations[char]?.tags.includes("causes-droisoning") ||
      considerations[char]?.tags.includes("causes-misregistration")
  );

  if (misinfoChars.length > MAX_MISINFORMATION) {
    return {
      severity: "medium",
      id: "misinfo",
      message: `There are ${misinfoChars.length} sources of misinformation on this script. Consider removing some of them.`,
      characters: misinfoChars,
    };
  }

  if (misinfoChars.length < MIN_MISINFORMATION && !chars.includes("fibbin")) {
    return {
      severity: "low",
      id: "misinfo",
      message: `There ${
        misinfoChars.length === 1
          ? `is only 1 source`
          : `are ${misinfoChars.length} sources`
      } of misinformation on this script. Consider adding more, or using the Fibbin fabled.`,
      characters: misinfoChars,
    };
  }
  return null;
}

function singleResurrectionSource(script: Script): ValidationResult | null {
  const chars = getCharacters(script);
  const resurrectionChars = chars.filter((char) =>
    considerations[char]?.tags.includes("resurrection")
  );
  if (resurrectionChars.length === 1) {
    // If the single source of resurrection is the only demon on the script, ignore this warning.
    const charIsOnlyDemon =
      ALL_CHARACTERS[resurrectionChars[0]].type === "demon" &&
      chars.filter((c) => ALL_CHARACTERS[c].type === "demon").length === 1;
    if (charIsOnlyDemon) return null;

    return {
      severity: "medium",
      id: "single-resurrection",
      message: `There is only 1 source of resurrection on this script. Consider adding more resurrection sources to avoid hard-confirming characters.`,
      characters: resurrectionChars,
    };
  }
  return null;
}

function singleExtraDeathSource(script: Script): ValidationResult | null {
  const chars = getCharacters(script);
  const extraDeathChars = chars.filter((char) =>
    considerations[char]?.tags.includes("extra-death")
  );
  if (extraDeathChars.length === 1) {
    // If the single source of extra death is the only demon on the script, ignore this warning.
    const charIsOnlyDemon =
      ALL_CHARACTERS[extraDeathChars[0]].type === "demon" &&
      chars.filter((c) => ALL_CHARACTERS[c].type === "demon").length === 1;
    if (charIsOnlyDemon) return null;

    return {
      severity: "medium",
      id: "single-extra-death",
      message: `There is only 1 source of extra death at night on this script. Consider adding more extra death sources to avoid hard-confirming characters.`,
      characters: extraDeathChars,
    };
  }
  return null;
}

function confirmationChain(script: Script): ValidationResult | null {
  const MAX_CONFIRMATION_CHAIN = 6;
  const chars = getCharacters(script);
  const confirmationChars = chars.filter(
    (char) =>
      considerations[char]?.tags.includes("self-confirming") ||
      considerations[char]?.tags.includes("character-confirmation")
  );
  if (confirmationChars.length > MAX_CONFIRMATION_CHAIN) {
    return {
      severity: "medium",
      id: "confirmation-chain",
      message: `There are ${confirmationChars.length} characters that can confirm themselves or each other. Consider reducing this to avoid long confirmation chains.`,
      characters: confirmationChars,
    };
  }
  return null;
}

function characterClashes(script: Script): ValidationResult[] {
  const chars = getCharacters(script);
  const clashResults: ValidationResult[] = [];
  const processedPairs = new Set<CharacterID>();

  scriptCharLoop: for (const char of chars) {
    const clashes = considerations[char]?.clashes;
    if (!clashes) continue scriptCharLoop;

    clashLoop: for (const clash of clashes) {
      const clashingChars = clash.characters.filter((clashChar) =>
        chars.includes(clashChar)
      );

      if (!clashingChars.length) continue clashLoop;

      clashCharLoop: for (const clashChar of clashingChars) {
        // Create a sorted pair key to avoid duplicate clashes
        const pairKey = [char, clashChar].sort().join(",") as Lowercase<string>;
        if (processedPairs.has(pairKey)) continue clashCharLoop;

        processedPairs.add(pairKey);

        clashResults.push({
          severity: clash.severity,
          id: "character-clash",
          message: clash.reason,
          characters: [char, clashChar],
        });
      }
    }
  }
  return clashResults;
}

function legion(script: Script): ValidationResult | null {
  const chars = getCharacters(script);
  if (!chars.includes("legion")) return null;
  // const scriptHasVortox = chars.includes("vortox");

  const OVERPOWERED = ["slayer", "snakecharmer"];

  const OVERPOWERED_WITHOUT_VORTOX = [
    "artist",
    "chambermaid",
    "fortuneteller",
    "chef",
    "empath",
    "juggler",
    "knight",
    "noble",
    "oracle",
    "undertaker",
  ];

  const overpoweredChars = chars.filter((char) => OVERPOWERED.includes(char));
  const overpoweredWithoutVortox = chars.filter((char) =>
    OVERPOWERED_WITHOUT_VORTOX.includes(char)
  );

  overpoweredChars.push(...overpoweredWithoutVortox);

  if (overpoweredChars.length > 0) {
    return {
      severity: "high",
      id: "legion",
      message: `These characters are overpowered in Legion scripts. Consider removing these characters.`,
      characters: ["legion", ...overpoweredChars],
    };
  }
  return null;
}

function outsiderModification(script: Script): ValidationResult | null {
  const chars = getCharacters(script);
  const outsiderModChars = chars.filter((char) => {
    const setup = considerations[char]?.setup;
    return setup?.outsiders !== undefined;
  });

  if (outsiderModChars.length === 0) {
    return {
      severity: "medium",
      id: "outsider-modification",
      message: `Without any outsider modification, the evil team will struggle to bluff outsiders.`,
      characters: outsiderModChars,
    };
  }

  if (
    outsiderModChars.length === 1 &&
    ALL_CHARACTERS[outsiderModChars[0]].type === "demon"
  ) {
    return {
      severity: "medium",
      id: "outsider-modification",
      message: `If only the demon modifies the outsider count, it will be easy for the good team to deduce which demon is in play.`,
      characters: outsiderModChars,
    };
  }

  const shyOutsiders = chars.filter((char) =>
    considerations[char]?.tags.includes("shy-outsider")
  );
  if (outsiderModChars.length === 1 && shyOutsiders.length === 0) {
    return {
      severity: "medium",
      id: "outsider-modification",
      message: `If there is only one source of outsider modification, consider including more shy outsiders to hide this (eg. Mutant, Sweetheart, Barber).`,
      characters: outsiderModChars,
    };
  }

  return null;
}

function extraEvilPlayers(script: Script): ValidationResult | null {
  const chars = getCharacters(script);

  // Don't activate this rule if Spirit of Ivory is on the script
  if (chars.includes("spiritofivory")) {
    return null;
  }

  const extraEvilChars = chars.filter((char) =>
    considerations[char]?.tags.includes("extra-evil")
  );

  if (extraEvilChars.length >= 3) {
    return {
      severity: "high",
      id: "extra-evil",
      message: `There are ${extraEvilChars.length} characters that can add extra evil players. This is unbalanced in favor of evil. Consider adding the Spirit of Ivory to prevent this.`,
      characters: extraEvilChars,
    };
  }

  if (extraEvilChars.length === 2) {
    return {
      severity: "medium",
      id: "extra-evil",
      message: `There are ${extraEvilChars.length} characters that can add extra evil players. This may make the game unbalanced in favor of evil, consider adding the Spirit of Ivory to prevent this.`,
      characters: extraEvilChars,
    };
  }

  return null;
}

function onlyGoodExecutionProtection(script: Script): ValidationResult | null {
  const chars = getCharacters(script);

  const executionProtectionChars = chars.filter((char) =>
    considerations[char]?.tags.includes("prevents-execution")
  );

  const goodExecutionProtectionChars = executionProtectionChars.filter(
    (char) =>
      ALL_CHARACTERS[char].type === "outsider" ||
      ALL_CHARACTERS[char].type === "townsfolk"
  );

  if (goodExecutionProtectionChars.length && chars.includes("boffin")) {
    executionProtectionChars.push("boffin");
  }

  if (
    executionProtectionChars.length > 0 &&
    executionProtectionChars.length === goodExecutionProtectionChars.length
  ) {
    return {
      severity: "medium",
      id: "only-good-execution-protection",
      message:
        "All sources of execution protection are good-aligned, meaning that these characters can be hard-confirmed. Consider adding evil-aligned execution protection (eg. Devil's Advocate, Lleech, or Boffin).",
      characters: executionProtectionChars,
    };
  }
  return null;
}

// Utility functions for constraint evaluation
function evaluateConstraint(
  script: Script,
  constraint: Constraint,
  _triggeringCharacter: string
): boolean {
  const chars = getCharacters(script);
  const count = getConstraintCount(chars, constraint.tag);

  switch (constraint.operator) {
    case "==":
      return count === constraint.value;
    case "<":
      return count < constraint.value;
    case "<=":
      return count <= constraint.value;
    case ">":
      return count > constraint.value;
    case ">=":
      return count >= constraint.value;
    default:
      return false;
  }
}

function getConstraintCount(chars: string[], tag: string | string[]): number {
  if (Array.isArray(tag)) {
    // Tag array - count characters that have any of these tags
    return chars.filter((char) =>
      tag.some((t) => considerations[char]?.tags.includes(t))
    ).length;
  }

  // Check if tag is a character type
  const characterTypes = [
    "townsfolk",
    "outsider",
    "minion",
    "demon",
    "traveller",
    "fabled",
  ];
  if (characterTypes.includes(tag)) {
    return chars.filter((char) => ALL_CHARACTERS[char]?.type === tag).length;
  }

  // Tag is a specific character ID
  return chars.includes(tag) ? 1 : 0;
}

function checkSuggestions(script: Script): ValidationResult[] {
  const chars = getCharacters(script);
  const results: ValidationResult[] = [];

  for (const char of chars) {
    const suggestions = considerations[char]?.suggestions;
    if (!suggestions) continue;

    for (const suggestion of suggestions) {
      if (!evaluateConstraint(script, suggestion, char)) {
        results.push({
          severity: suggestion.severity,
          id: "suggestions",
          message: suggestion.message,
          characters: [char],
        });
      }
    }
  }

  return results;
}

function checkRequirements(script: Script): ValidationResult[] {
  const chars = getCharacters(script);
  const results: ValidationResult[] = [];

  for (const char of chars) {
    const requirements = considerations[char]?.requirements;
    if (!requirements) continue;

    for (const requirement of requirements) {
      if (!evaluateConstraint(script, requirement, char)) {
        results.push({
          severity: requirement.severity,
          id: "requirements",
          message: requirement.message,
          characters: [char],
        });
      }
    }
  }

  return results;
}
