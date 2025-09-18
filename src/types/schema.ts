export type CharacterID = Lowercase<string>;
export type CharacterName = string;
export type CharacterIcon = string;
/**
 * For non-traveller characters, the icons should be regular alignment and flipped alignment, for travellers they should be unaligned, good alignment and evil alignment
 */
export type SetOfCharacterIconURLs =
  | [string]
  | [string, string]
  | [string, string, string];
export type CharacterTeam =
  | "townsfolk"
  | "outsider"
  | "minion"
  | "demon"
  | "traveller"
  | "fabled";
export type TheEditionID = string;
export type CharacterAbility = string;
export type CharacterFlavorText = string;

/**
 * 0 Means this character does not wake during the first night
 */
export type FirstNightWakeUpPriority = number;
export type FirstNightStorytellerReminder = string;
/**
 * 0 Means this character does not wake during other nights
 */
export type OtherNightsWakeUpPriority = number;
export type OtherNightsStorytellerReminder = string;
export type CharacterReminderTokens = string[];
/**
 * These will be selectable even when the character is not in play
 */
export type GlobalCharacterReminderTokens = string[];
export type HasGameSetupAbility = boolean;
export type IDOfOtherJinxedCharacter = string;
export type JinxExplanation = string;
export type Jinxes = JinxPair[];
/**
 * Currently supported values are:
 *  selection - during character selection,
 *  signal - during night signaling,
 *  ability - when clicking on the character token,
 *  vote - during a vote,
 *  reveal - at the end of the game, before characters are revealed,
 *  player - an ability that can be initiated by the player
 */
export type IntegrationType =
  | "selection"
  | "ability"
  | "signal"
  | "vote"
  | "reveal"
  | "player";
/**
 * This is a list of the currently implemented special features and will be growing over time.
 */
export type FeatureNameReference =
  | "grimoire"
  | "pointing"
  | "ghost-votes"
  | "distribute-roles"
  | "bag-disabled"
  | "bag-duplicate"
  | "multiplier"
  | "hidden"
  | "replace-character"
  | "player"
  | "card"
  | "open-eyes";
/**
 * The text value that will be used by the special ability.
 */
export type SpecialAbilityTextValue = string;
/**
 * The numeric value that will be used by the special ability.
 */
export type SpecialAbilityNumberValue = number;
export type AbilityUseTime =
  | "pregame"
  | "day"
  | "night"
  | "firstNight"
  | "firstDay"
  | "otherNight"
  | "otherDay";
/**
 * If it's a global ability that can be used without the character being in play, this property defines on which characters it can be used. This does not work on Fabled, because they are not considered to be on the Script.
 */
export type GlobalAbilityScope =
  | "townsfolk"
  | "outsider"
  | "minion"
  | "demon"
  | "traveller"
  | "dead";
export type SpecialAppIntegrationFeaturesForThisCharacter =
  SpecialAppIntegrationFeature[];
/**
 * If you want to include official characters in the script, it is sufficient to provide their ID as a string
 */
export type OfficialCharacterID = Lowercase<string>;
export type MetaID = "_meta";
export type ScriptName = string;
export type ScriptAuthor = string;
export type ScriptLogoImage = string;
export type HideScriptTitleAuthor = boolean;
export type ScriptBackgroundImage = string;
export type AlmanacLink = string;
export type HomebrewRule = string;
/**
 * Any (optional) homebrew rules that should be shown on the character sheet can be listed here, up to a limit of 10.
 */
export type HomebrewRules = HomebrewRule[];
export type FirstNightOrderCharacterID = string;
/**
 * A custom first night order for this script can be provided in the form of an array here, with optional special entries for 'dusk', 'minioninfo', 'demoninfo' and 'dawn'.
 */
export type RelativeFirstNightOrder = FirstNightOrderCharacterID[];
export type OtherNightOrderCharacterID = string;
/**
 * A custom other night order for this script can be provided in the form of an array here, with optional special entries for 'dusk' and 'dawn'.
 */
export type RelativeOtherNightOrder = OtherNightOrderCharacterID[];
export type BloodOnTheClocktowerCustomScript = (
  | ScriptCharacter
  | OfficialCharacterID
  | ScriptMetadata
  | OfficialCharacterDeprecated
)[];

export interface ScriptCharacter {
  id: CharacterID;
  name: CharacterName;
  image?: CharacterIcon | SetOfCharacterIconURLs;
  team: CharacterTeam;
  edition?: TheEditionID;
  ability: CharacterAbility;
  flavor?: CharacterFlavorText;
  firstNight?: FirstNightWakeUpPriority;
  firstNightReminder?: FirstNightStorytellerReminder;
  otherNight?: OtherNightsWakeUpPriority;
  otherNightReminder?: OtherNightsStorytellerReminder;
  reminders?: CharacterReminderTokens;
  remindersGlobal?: GlobalCharacterReminderTokens;
  setup?: HasGameSetupAbility;
  jinxes?: Jinxes;
  special?: SpecialAppIntegrationFeaturesForThisCharacter;
}
export interface JinxPair {
  id: IDOfOtherJinxedCharacter;
  reason: JinxExplanation;
  [k: string]: unknown;
}
export interface SpecialAppIntegrationFeature {
  type: IntegrationType;
  name: FeatureNameReference;
  value?: SpecialAbilityTextValue | SpecialAbilityNumberValue;
  time?: AbilityUseTime;
  global?: GlobalAbilityScope;
  [k: string]: unknown;
}
export interface ScriptMetadata {
  id: MetaID;
  name: ScriptName;
  author?: ScriptAuthor;
  logo?: ScriptLogoImage;
  hideTitle?: HideScriptTitleAuthor;
  background?: ScriptBackgroundImage;
  almanac?: AlmanacLink;
  bootlegger?: HomebrewRules;
  firstNight?: RelativeFirstNightOrder;
  otherNight?: RelativeOtherNightOrder;
  [k: string]: unknown;
}

/**
 * @deprecated Use OfficialCharacterID instead
 */
export interface OfficialCharacterDeprecated {
  id: OfficialCharacterID;
}
