import Attackus from "./Spells/Attackus";

class Character {
  constructor(
    id,
    firstName,
    lastName,
    maxHealth = 100,
    maxMana = 0,
    attack = 10,
    spells
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.maxHealth = maxHealth;
    this.maxMana = maxMana;
    this.health = maxHealth;
    this.mana = maxMana;
    this.attack = attack;
    this.spells = spells || [new Attackus()];
    this.status = [];
    this.isProtected = 0;
    this.isStunned = 0;
    this.isReady = false;
  }

  isAlive() {
    return this.health > 0;
  }

  addSpell(spell) {
    this.spells.push(spell);
  }

  removeSpell(spell) {
    this.spells = this.spells.filter((s) => s !== spell);
  }

  takeDamage(damage) {
    if (this.isProtected > 0) {
      this.isProtected--;
      if (this.isProtected === 0) {
        this.status = this.status.filter((status) => status !== "protected");
      }
      console.log(
        `${this.firstName} ${this.lastName} is protected, no damage taken !`
      );
      return;
    }
    this.health -= damage;
  }

  heal(heal) {
    this.health += heal;
  }

  setProtected(turn) {
    if (!this.status.includes("protected")) {
      this.status.push("protected");
    }
    this.isProtected = turn;
  }

  setStunned(turn) {
    if (!this.status.includes("stunned")) {
      this.status.push("stunned");
    }
    this.isStunned = turn;
  }

  getSpellFromId(id) {
    return this.spells.find((spell) => spell.id === id);
  }

  castSpell(spell, character) {
    if (this.isStunned > 0) {
      console.log(
        `${this.firstName} ${this.lastName} is stunned, no spell cast !`
      );
      return;
    }

    if (spell.getManaCost() > this.mana) {
      console.log("Not enough mana");
      return;
    }

    this.mana -= spell.getManaCost();
    spell.cast(character);
    console.log(
      `${this.firstName} ${this.lastName} casts ${spell.name} on ${character.firstName} ${character.lastName}`
    );
    console.log(
      `${character.firstName} ${character.lastName} has ${character.health} health left`
    );
  }

  autoAttack(character) {
    character.takeDamage(this.attack);
    console.log(
      `${this.firstName} ${this.lastName} attacks ${character.firstName} ${character.lastName}`
    );
    console.log(
      `${character.firstName} ${character.lastName} has ${character.health} health left`
    );
  }
}

export default Character;
