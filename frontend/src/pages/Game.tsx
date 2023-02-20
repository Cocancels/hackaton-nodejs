import { useEffect, useState } from "react";
import Game from "../classes/game";
import Incendio from "../classes/Spells/Incendio";
import Reparo from "../classes/Spells/Reparo";
import CharacterComponent from "../components/Character/Character";
import Character from "../classes/character";
import "./game.css";

export const GamePage = () => {
  let character1 = new Character("John", "Doe", 100, 100, 10, [
    new Incendio(),
    new Reparo(),
  ]);

  let character2 = new Character("Jane", "Doe", 100, 100, 10, [
    new Incendio(),
    new Reparo(),
  ]);

  const [characters, setCharacters] = useState<Character[]>([
    character1,
    character2,
  ]);
  const [game, setGame] = useState<Game>(new Game());
  const [turnInProgress, setTurnInProgress] = useState<boolean>(false);

  const startGame = async () => {
    characters.forEach((character) => {
      game.addCharacter(character);
    });

    game.play();
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    setCharacters(game.characters);
  }, [game]);

  return (
    <div className="Game">
      <h1>Game</h1>
      <div className="game-container">
        {characters.map((character, index) => {
          return (
            <div key={`character-${index}`}>
              <CharacterComponent character={character} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
