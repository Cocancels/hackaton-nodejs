import { Spell } from "./Spell";

export interface Character {
  id?: number;
  firstName: string;
  lastName: string;
  maxHealth: number;
  maxMana: number;
  health: number;
  mana: number;
  attack: number;
  spells: Spell[];
}
