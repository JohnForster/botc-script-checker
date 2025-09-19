import type { CharacterID } from "../types/schema";

export interface CharacterConsiderations {
  /**
   * Characters that have mechanical conflicts (jinxes) with this character
   */
  jinxes: string[];

  /**
   * Mandatory conditions that must be met when including this character
   */
  requirements?: Constraint[];

  /**
   * Recommended conditions for optimal game balance
   */
  suggestions?: Constraint[];

  /**
   * Behavioral tags that categorize the character's effects
   */
  tags: string[];

  /**
   * How this character affects the game setup
   */
  setup: {
    /** Modification to outsider count - can be numbers or "arbitrary" */
    outsiders?: number[] | "arbitrary";
    /** Modification to townsfolk count - can be numbers or "arbitrary" */
    townsfolk?: number[] | "arbitrary";
    /** Modification to minion count - can be numbers or "arbitrary" */
    minions?: number[] | "arbitrary";
    /** Modification to demon count - can be numbers or "arbitrary" */
    demons?: number[] | "arbitrary";
  };

  /**
   * Character interactions that produce bad interactions, but do not have an effective jinx
   */
  clashes?: Clash[];
}

export type Constraint = {
  /** The `tag` field can include character types IDs or IDs */
  tag: string | string[];
  operator: "==" | "<" | "<=" | ">" | ">=";
  value: number;
  message: string;
  severity: Severity;
};

export type Severity = "low" | "medium" | "high";

export type Clash = {
  characters: CharacterID[];
  reason: string;
  severity: Severity;
};

/**
 * Complete considerations data mapping character IDs to their considerations
 */
export type ConsiderationsData = {
  [characterId: string]: CharacterConsiderations;
};
