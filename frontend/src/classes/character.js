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
    this.spells = spells;
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
    this.health -= damage;
  }

  heal(heal) {
    this.health += heal;
  }

  getSpellFromId(id) {
    return this.spells.find((spell) => spell.id === id);
  }

  castSpell(spell, character) {
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
