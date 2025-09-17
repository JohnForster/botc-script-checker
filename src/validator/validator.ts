import type { Script } from "../types/types";
import considerationsJSON from "../data/considerations.json";
import type { ConsiderationsData } from "../data/considerations.d.ts";

const considerations = considerationsJSON as ConsiderationsData;

export type ValidationResult = {
  severity: "clash" | "warning";
  id: string;
  message: string;
  characters: string[];
};

const CHECKS: ((script: Script) => ValidationResult | null)[] = [
  tooMuchDroisoning,
];

export function validateScript(script: Script): ValidationResult[] {
  const results: ValidationResult[] = [];
  for (const check of CHECKS) {
    const result = check(script);
    if (result) {
      results.push(result);
    }
  }
  return results;
}

function tooMuchDroisoning(script: Script): ValidationResult | null {
  const MAX_DROISONING = 6;
  const chars = script.slice(1) as string[];
  const droisoningChars = chars.filter((char) =>
    considerations[char]?.tags.includes("causes-droisoning")
  );
  if (droisoningChars.length > MAX_DROISONING) {
    return {
      severity: "warning",
      id: "droisoning",
      message: `There are ${droisoningChars.length} sources of droisoning on this script. Consider removing some of them.`,
      characters: droisoningChars,
    };
  }
  return null;
}
