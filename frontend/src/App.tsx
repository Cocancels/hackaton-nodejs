<<<<<<< HEAD
import React, { useEffect } from "react";
import { GamePage } from "./pages/Game";
import Game from "./classes/game.js";
import Character from "./classes/character.js";
import Incendio from "./classes/Spells/Incendio";
import Reparo from "./classes/Spells/Reparo";

=======
>>>>>>> main
function App() {
  let character1 = new Character("John", "Doe", 100, 100, 10, [
    new Incendio(),
    new Reparo(),
  ]);

  let character2 = new Character("Jane", "Doe", 100, 100, 10, [
    new Incendio(),
    new Reparo(),
  ]);

  let game = new Game();

  game.addCharacter(character1);
  game.addCharacter(character2);

  function playGame() {
    game.play();
  }

  useEffect(() => {
    playGame();
  }, []);

  return (
<<<<<<< HEAD
    <div className="App">
      <GamePage />
    </div>
=======
    <div className="App"></div>
>>>>>>> main
  );
}

export default App;
