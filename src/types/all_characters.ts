export interface Character {
  /**
   * The display name of the character
   */
  name: string;

  /**
   * The character's ability text
   */
  ability: string;

  /**
   * The character type - determines their team and behavior
   */
  type: "townsfolk" | "outsider" | "minion" | "demon" | "travellers" | "fabled";

  /**
   * The filename of the character's icon image
   */
  icon: string;

  /**
   * Whether this character acts on the first night
   */
  first_night: boolean;

  /**
   * Whether this character acts on subsequent nights
   */
  other_nights: boolean;

  /**
   * Reminder tokens used by the Storyteller to track this character's effects
   */
  reminders: string[];

  /**
   * Whether this character affects the game setup (player counts, roles, etc.)
   */
  affects_setup: boolean;

  /**
   * The official script this character first appeared in
   */
  home_script: string;

  /**
   * The unique identifier for this character
   */
  id: string;
}

/**
 * Complete all characters data mapping character IDs to their information
 */
export type AllCharactersData = {
  [characterId: string]: Character;
};
