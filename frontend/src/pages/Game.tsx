import { useEffect, useState } from "react";
import Game from "../classes/game";
import Incendio from "../classes/Spells/Incendio";
import Reparo from "../classes/Spells/Reparo";
import Protego from "../classes/Spells/Protego";
import CharacterComponent from "../components/Character/Character";
import Character from "../classes/character";
import "./game.css";
import Button from "../components/Button/Button";
import PetrificusTotalus from "../classes/Spells/PetrificusTotalus";

export const GamePage = () => {
  let character1 = new Character(0, "Harry", "Potter", 100, 100, 10, [
    new Incendio(),
    new Reparo(),
    new Protego(),
    new PetrificusTotalus(),
  ]);

  let character2 = new Character(1, "Hermione", "Granger", 100, 100, 10, [
    new Incendio(),
    new Reparo(),
    new Protego(),
    new PetrificusTotalus(),
  ]);

  const [characters, setCharacters] = useState<Character[]>([
    character1,
    character2,
  ]);
  const [game, setGame] = useState<Game>(new Game(characters));
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<Character>();
  const [turn, setTurn] = useState<number>(0);
  const [chooseTarget, setChooseTarget] = useState<boolean>(false);
  const [selectedSpell, setSelectedSpell] = useState<number>(0);

  const handleStartGame = () => {
    game.startGame();
    setGame(game);
    setIsGameStarted(true);
    setCurrentPlayer(game.currentPlayer);
  };

  const handleChoseSpell = (id: number) => {
    setSelectedSpell(id);
    setChooseTarget(true);
  };

  const handleSpellUse = (id: number, target: Character) => {
    const spell = game.currentPlayer.getSpellFromId(id);
    game.handleUserTurn(spell, target);
    setGame(game);
    setCurrentPlayer(game.currentPlayer);
    setTurn(turn + 1);
  };

  const handleTargetSelection = (character: Character) => {
    let target = character;
    setChooseTarget(false);
    handleSpellUse(selectedSpell, target);
  };

  const handleEndGame = () => {
    if (isGameStarted) {
      if (game.currentPlayer.health <= 0) {
        console.log(game.endGame());
        setIsGameStarted(false);
        setGame(new Game([character1, character2]));
      } else {
        setCurrentPlayer(game.currentPlayer);
      }
    }
  };

  useEffect(() => {
    handleEndGame();
  }, [turn]);

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
              {isGameStarted && (
                <CharacterComponent
                  character={character}
                  onSpellClick={handleChoseSpell}
                  isCurrentPlayer={character.id === currentPlayer?.id}
                />
              )}
            </div>
          );
        })}
      </div>
      {!isGameStarted && (
        <Button
          onClick={() => handleStartGame()}
          className="start-game"
          label="Start Game"
        />
      )}
      {
        <div className="game-container">
          {chooseTarget &&
            characters.map((character, index) => {
              return (
                <div key={`character-${index}`}>
                  <Button
                    onClick={() => handleTargetSelection(character)}
                    className="start-game"
                    label={character.firstName}
                  />
                </div>
              );
            })}
        </div>
      }
    </div>
  );
};
