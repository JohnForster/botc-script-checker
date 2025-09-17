export interface CharacterConsiderations {
  /**
   * Characters that have mechanical conflicts (jinxes) with this character
   */
  jinxes: string[];

  /**
   * Mandatory conditions that must be met when including this character
   */
  requirements: {
    /** Number of drunk/poisoned players requirement */
    droisoning?: string;
    /** Specific character that must be present */
    character?: string;
    /** Number of outsiders requirement */
    outsiders?: string;
  };

  /**
   * Recommended conditions for optimal game balance
   */
  suggestions: {
    /** Recommended number of drunk/poisoned players */
    droisoning?: string;
  };

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

export type Clash = {
  characters: string[];
  reason: string;
  severity: "low" | "medium" | "high";
};

/**
 * Complete considerations data mapping character IDs to their considerations
 */
export type ConsiderationsData = {
  [characterId: string]: CharacterConsiderations;
};

declare const considerations: ConsiderationsData;
export default considerations;
