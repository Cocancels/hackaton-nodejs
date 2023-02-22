import { Spell } from "./Spell";

export interface Character {
  avatarImg: string;
  id?: number;
  firstName: string;
  lastName: string;
  maxHealth: number;
  maxMana: number;
  health: number;
  mana: number;
  attack: number;
  spells: Spell[];
  status: string[];
  isProtected: number;
  isStunned: number;
}
