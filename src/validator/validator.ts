import type { Script } from "../types/types";
import considerationsJSON from "../data/considerations.json";
import type { ConsiderationsData } from "../data/considerations.d.ts";

const considerations = considerationsJSON as ConsiderationsData;

export type ValidationResult = {
  severity: "high" | "medium" | "low";
  id: string;
  message: string;
  characters: string[];
};

const CHECKS: ((
  script: Script
) => (ValidationResult | null) | ValidationResult[])[] = [
  tooMuchMisinfo,
  singleResurrectionSource,
  singleExtraDeathSource,
  confirmationChain,
  characterClashes,
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
  return results;
}

function tooMuchMisinfo(script: Script): ValidationResult | null {
  const MAX_DROISONING = 6;
  const chars = script.slice(1) as string[];
  const droisoningChars = chars.filter(
    (char) =>
      considerations[char]?.tags.includes("causes-droisoning") ||
      considerations[char]?.tags.includes("causes-misregistration")
  );
  if (droisoningChars.length > MAX_DROISONING) {
    return {
      severity: "medium",
      id: "droisoning",
      message: `There are ${droisoningChars.length} sources of droisoning on this script. Consider removing some of them.`,
      characters: droisoningChars,
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
