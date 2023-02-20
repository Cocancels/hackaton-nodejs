class Game {
  constructor(characters) {
    this.characters = characters;
    this.currentTurn = 0;
    this.currentPlayer = null;
    this.opponentPlayer = null;
  }

  endTurn() {
    this.currentTurn = (this.currentTurn + 1) % this.characters.length;
    this.currentPlayer = this.opponentPlayer;
    this.opponentPlayer = this.getOpponentPlayer();
    console.log(`Turn ${this.currentTurn + 1} begins`);
  }

  endGame() {
    console.log("Game over");
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

  handleUserTurn(spell, target) {
    if (this.currentPlayer.isAlive()) {
      this.currentPlayer.castSpell(spell, target);
      this.endTurn();
    }
  }

  getOpponentPlayer() {
    return this.characters.filter(
      (character) => character !== this.currentPlayer
    )[0];
  }

  getRandomCharacter() {
    return this.characters[Math.floor(Math.random() * this.characters.length)];
  }

  startGame() {
    this.currentPlayer = this.getRandomCharacter();
    this.opponentPlayer = this.getOpponentPlayer();
  }
}

export default Game;
