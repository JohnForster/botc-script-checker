import type { Script } from "../types/types";
import considerationsJSON from "../data/considerations.json";
import type { ConsiderationsData } from "../data/considerations.d.ts";
const considerations = considerationsJSON as ConsiderationsData;
import compiledCharactersJSON from "../data/compiled_characters.json";
import type { CompiledCharactersData } from "../data/compiled_characters";
const allCharacters = compiledCharactersJSON as CompiledCharactersData;

export const FAILURES = {
  misinfo: "Misinformation",
  legion: "Legion Clashes",
  "single-resurrection": "Resurrection",
  "single-extra-death": "Extra Death",
  "confirmation-chain": "Confirmation Chain",
  "character-clash": "Character Clash",
  "outsider-modification": "Outsider Modification",
  "extra-evil": "Extra Evil Players",
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
  const chars = script.slice(1) as string[];
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

  if (misinfoChars.length < MIN_MISINFORMATION) {
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
  const chars = script.slice(1) as string[];
  const resurrectionChars = chars.filter((char) =>
    considerations[char]?.tags.includes("resurrection")
  );
  if (resurrectionChars.length === 1) {
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
  const chars = script.slice(1) as string[];
  const extraDeathChars = chars.filter((char) =>
    considerations[char]?.tags.includes("extra-death")
  );
  if (extraDeathChars.length === 1) {
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
  const chars = script.slice(1) as string[];
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
  const chars = script.slice(1) as string[];
  const clashResults: ValidationResult[] = [];
  const processedPairs = new Set<string>();

  for (const char of chars) {
    const clashes = considerations[char]?.clashes;
    if (!clashes) continue;

    for (const clash of clashes) {
      const foundClashChars = clash.characters.filter((clashChar) =>
        chars.includes(clashChar)
      );

      if (foundClashChars.length > 0) {
        for (const clashChar of foundClashChars) {
          // Create a sorted pair key to avoid duplicate clashes
          const pairKey = [char, clashChar].sort().join(",");
          if (!processedPairs.has(pairKey)) {
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
    }
  }
  return clashResults;
}

function legion(script: Script): ValidationResult | null {
  const chars = script.slice(1) as string[];
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
  const chars = script.slice(1) as string[];
  const outsiderModChars = chars.filter((char) => {
    const setup = considerations[char]?.setup;
    return setup?.outsiders !== undefined;
  });

  if (outsiderModChars.length == 0) {
    return {
      severity: "medium",
      id: "outsider-modification",
      message: `Without any outsider modification, the evil team will struggle to bluff outsiders.`,
      characters: outsiderModChars,
    };
  }

  if (
    outsiderModChars.length == 1 &&
    allCharacters[outsiderModChars[0]].type == "demon"
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
      message: `If their is only one source of outsider modification, consider including more shy outsiders to hide this (eg. Mutant, Sweetheart, Barber).`,
      characters: outsiderModChars,
    };
  }

  return null;
}

function extraEvilPlayers(script: Script): ValidationResult | null {
  const chars = script.slice(1) as string[];
  const extraEvilChars = chars.filter((char) =>
    considerations[char]?.tags.includes("extra-evil")
  );

  if (extraEvilChars.length >= 3) {
    return {
      severity: "high",
      id: "extra-evil",
      message: `There are ${extraEvilChars.length} characters that can add extra evil players. This may make the game unbalanced in favor of evil.`,
      characters: extraEvilChars,
    };
  }

  if (extraEvilChars.length === 2) {
    return {
      severity: "medium",
      id: "extra-evil",
      message: `There are ${extraEvilChars.length} characters that can add extra evil players. Consider if this provides enough balance for the good team.`,
      characters: extraEvilChars,
    };
  }

  return null;
}
