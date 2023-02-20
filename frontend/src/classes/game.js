class Game {
  constructor() {
    this.characters = [];
    this.currentTurn = 0;
  }

  addCharacter(character) {
    this.characters.push(character);
  }

  getCurrentCharacter() {
    return this.characters[this.currentTurn];
  }

  endTurn() {
    this.currentTurn = (this.currentTurn + 1) % this.characters.length;
    console.log(`Turn ${this.currentTurn + 1} begins`);
  }

  isGameOver() {
    let aliveCharacters = 0;
    for (let character of this.characters) {
      if (character.isAlive()) {
        aliveCharacters++;
      }
    }
    return aliveCharacters < 2;
  }

  getRandomSpell(spells) {
    let spellIndex = Math.floor(Math.random() * spells.length);
    return spells[spellIndex];
  }

  playTurn() {
    let currentCharacter = this.getCurrentCharacter();

    if (!currentCharacter.isAlive()) {
      this.endTurn();
      return;
    }

    let aliveCharacters = [];
    for (let character of this.characters) {
      if (character.isAlive() && character !== currentCharacter) {
        aliveCharacters.push(character);
      }
    }

    if (aliveCharacters.length === 0) {
      return;
    }

    let targetIndex = Math.floor(Math.random() * aliveCharacters.length);
    let target = aliveCharacters[targetIndex];

    if (currentCharacter.mana > 0) {
      let spell = this.getRandomSpell(currentCharacter.spells);
      currentCharacter.castSpell(spell, target);
    } else {
      currentCharacter.autoAttack(target);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    }).then(() => {
      this.endTurn();
    });
  }

  play() {
    while (!this.isGameOver()) {
      this.playTurn();
    }
  }
}

export default Game;
