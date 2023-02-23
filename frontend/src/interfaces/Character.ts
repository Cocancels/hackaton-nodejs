import { Spell } from "./Spell";

export interface CharacterData {
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
  nickName : string;
  isReady: boolean;
}
