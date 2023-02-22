import { useEffect, useState } from "react";
import Game from "../../classes/game";
import CharacterComponent from "../../components/Character/Character";
import Character from "../../classes/character";
import "./game.css";
import Button from "../../components/Button/Button";
import { User } from "../../interfaces/User";
import { Room } from "../../interfaces/Room";
import Incendio from "../../classes/Spells/Incendio";
import { io } from "socket.io-client";
import { RoomList } from "./Rooms/RoomsList/RoomList";
import PetrificusTotalus from "../../classes/Spells/PetrificusTotalus";
import { UserInterface } from "./UserInterface/UserInterface";
import Protego from "../../classes/Spells/Protego";
import Reparo from "../../classes/Spells/Reparo";
import Attackus from "../../classes/Spells/Attackus";
import Avadakedavra from "../../classes/Spells/Avadakedavra";

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling", "flashsocket"],
});

interface Results {
  winner: Character;
  looser: Character;
}

export const GamePage = () => {
  const [actualRoom, setActualRoom] = useState<Room>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [actualUser, setActualUser] = useState<User>();
  const [game, setGame] = useState<Game>();
  const [canGameStart, setCanGameStart] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<Character>();
  const [turn, setTurn] = useState<number>(0);
  const [chooseTarget, setChooseTarget] = useState<boolean>(false);
  const [selectedSpell, setSelectedSpell] = useState<number>(0);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [spellUsed, setSpellUsed] = useState<boolean>(false);
  const [results, setResults] = useState<Results>();

  useEffect(() => {
    fetchData();

    socket.on("roomCreated", (rooms: Room[]) => {
      setRooms(rooms);
    });

    socket.on("roomJoined", (room: Room) => {
      setActualRoom(room);

      if (room.users.length === 2) {
        setCanGameStart(true);
      }
    });

    socket.on("gameStarted", (room: Room) => {
      setActualRoom(room);
      setIsGameStarted(true);
    });

    socket.on("gameUpdated", (room: Room) => {
      setActualRoom(room);
    });

    socket.on("roomLeft", (room: Room) => {
      setActualRoom(room);
    });

    socket.on("disconnectedAll", (rooms: Room[]) => {
      setRooms(rooms);
      handleLeaveRoom();
    });

    socket.on("gameEnded", (results: Results) => {
      setResults(results);
    });
  }, []);

  const fetchData = () => {
    const actualUser = localStorage.getItem("actualUser");

    if (actualUser) {
      const newActualUser = JSON.parse(actualUser);

      setActualUser({ ...newActualUser, isReadyToPlay: false });

      fetch("http://localhost:3001/rooms")
        .then((res) => res.json())
        .then((data) => {
          checkIfUserIsInRooms(newActualUser, data.rooms);
          setRooms(data.rooms);
        });

      socket.on("readySet", (room: Room, user: User) => {
        setActualRoom(room);
        if (user.id === newActualUser?.id) {
          setActualUser(user);
        }
      });
    }
  };

  const createClassCharacter = (user: User) => {
    const newCharacter = new Character(
      user.id,
      user.firstname,
      user.lastname,
      user.character.maxHealth,
      user.character.maxMana,
      user.character.attack,
      [
        new Attackus(),
        new Incendio(),
        new PetrificusTotalus(),
        new Protego(),
        new Reparo(),
        new Avadakedavra(),
      ]
    );
    return newCharacter;
  };

  const handleStartGame = () => {
    const game = new Game(characters, 0, null, null, false);
    game.startGame();
    setGame(game);
    setCurrentPlayer(game.currentPlayer);

    socket.emit("startGame", actualRoom, game);
  };

  const handleChoseSpell = (id: number) => {
    setSelectedSpell(id);
    setChooseTarget(true);
  };

  const handleSpellUse = (id: number, target: Character) => {
    const spell = currentPlayer?.getSpellFromId(id);
    game?.handleUserTurn(spell, target);
    setCurrentPlayer(game?.currentPlayer);
    setGame(game);
    setTurn(turn + 1);
    handleSpellAnimation();

    socket.emit("updateGame", actualRoom, game);
  };

  const handleTargetSelection = (character: Character) => {
    let target = character;
    setChooseTarget(false);
    handleSpellUse(selectedSpell, target);
  };

  const handleEndGame = () => {
    if (isGameStarted) {
      characters.forEach((character: Character) => {
        if (!character.isAlive()) {
          const results = game?.endGame();
          socket.emit("endGame", actualRoom, results);
        }
      });
    }
  };

  const createRoom = () => {
    socket.emit("createRoom");
  };

  const joinRoom = (id: number) => {
    socket.emit("joinRoom", id, actualUser);
  };

  const checkIfUserIsInRooms = (actualUser: User, rooms: Room[]) => {
    rooms.forEach((room) => {
      room.users.forEach((user) => {
        if (user.id === actualUser?.id) {
          setActualRoom(room);
        }
      });
    });
  };

  const handleLeaveRoom = () => {
    socket.emit("leaveRoom", actualRoom, actualUser);
    setActualRoom(undefined);
    resetGame();
    actualUser && setActualUser({ ...actualUser, isReadyToPlay: false });
  };

  const resetGame = () => {
    setGame(undefined);
    setCurrentPlayer(undefined);
    setCanGameStart(false);
    setIsGameStarted(false);
    setCharacters([]);
    setTurn(0);
    setSpellUsed(false);
  };

  const reorganizeCharacters = (characters: Character[]) => {
    const currentCharacter = characters.find(
      (character) => character.id === actualUser?.id
    );

    const filteredCharacters = characters.filter(
      (character) => character.id !== actualUser?.id
    );

    filteredCharacters.unshift(currentCharacter!);

    setCharacters(filteredCharacters);
  };

  useEffect(() => {
    handleEndGame();
  }, [game]);

  useEffect(() => {
    if (actualRoom) {
      if (!actualRoom.game) {
        const newCharacters = actualRoom.users.map((user) =>
          createClassCharacter(user)
        );

        reorganizeCharacters(newCharacters);
      } else {
        const currentPlayer = characters.find(
          (character) => character.id === actualRoom.game?.currentPlayer.id
        );
        const opponentPlayer = characters.find(
          (character) => character.id === actualRoom.game?.opponentPlayer.id
        );

        const newCharacters = characters.map((character) => {
          actualRoom.game?.characters.forEach((characterFromGame: any) => {
            if (character.id === characterFromGame.id) {
              character.health = characterFromGame.health;
              character.mana = characterFromGame.mana;
              character.attack = characterFromGame.attack;
              character.status = characterFromGame.status;
              character.isProtected = characterFromGame.isProtected;
              character.isStunned = characterFromGame.isStunned;
            }
          });
          return character;
        });

        setCharacters(newCharacters);

        setCurrentPlayer(currentPlayer);

        setGame(
          new Game(
            newCharacters,
            actualRoom.game?.currentTurn,
            currentPlayer,
            opponentPlayer,
            actualRoom.game?.isStarted
          )
        );
      }
    }
  }, [actualRoom]);

  useEffect(() => {
    game?.isStarted === true && setCharacters(game?.characters);
  }, [game]);

  const handleSpellAnimation = () => {
    setSpellUsed(true);
    setTimeout(() => {
      setSpellUsed(false);
    }, 1000);
  };

  const handleSetReady = () => {
    socket.emit("setReady", actualRoom, actualUser);
  };

  const isOdd = (num: number) => num % 2;

  return (
    <div className="game-container">
      {actualRoom ? (
        <Button
          className="leave-room"
          onClick={handleLeaveRoom}
          label="Leave Room"
        />
      ) : (
        <RoomList
          rooms={rooms}
          onCreateRoomClick={createRoom}
          onRoomClick={joinRoom}
        />
      )}

      {results?.winner && (
        <div>
          <h1>Results : {results.winner.firstName} won !</h1>
        </div>
      )}

      <div className="game-characters-container">
        {actualRoom &&
          characters.map((character: Character, index: number) => (
            <CharacterComponent
              key={character.id}
              character={character}
              flip={isOdd(index) ? true : false}
              isAttacking={spellUsed}
              actualUser={actualUser}
            />
          ))}
      </div>

      {actualRoom && (
        <UserInterface
          characters={characters}
          rooms={rooms}
          currentPlayer={currentPlayer}
          actualUser={actualUser}
          actualRoom={actualRoom}
          isGameStarted={isGameStarted}
          chooseTarget={chooseTarget}
          handleChoseSpell={handleChoseSpell}
          handleTargetSelection={handleTargetSelection}
          onCreateRoomClick={createRoom}
          onRoomClick={joinRoom}
          handleSetReady={handleSetReady}
          handleStartGame={handleStartGame}
          socket={socket}
          setActualRoom={setActualRoom}
        />
      )}
    </div>
  );
};
