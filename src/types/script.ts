import type {
  BloodOnTheClocktowerCustomScript,
  OfficialCharacterDeprecated,
  OfficialCharacterID,
  ScriptCharacter,
  ScriptMetadata,
} from "./schema";

export function getCharacters(script: BloodOnTheClocktowerCustomScript) {
  return script.map(getCharacterID).filter((x): x is Lowercase<string> => !!x);
}

type ScriptElement =
  | ScriptCharacter
  | OfficialCharacterID
  | ScriptMetadata
  | OfficialCharacterDeprecated;

function getCharacterID(char: ScriptElement) {
  if (typeof char === "string") return char;

  if (char?.id === "_meta") return null;

  return char.id;
}

export function getName(script: BloodOnTheClocktowerCustomScript) {
  return script.find(isMeta)?.name;
}

function isMeta(el: ScriptElement): el is ScriptMetadata {
  return typeof el !== "string" && el.id === "_meta";
}
