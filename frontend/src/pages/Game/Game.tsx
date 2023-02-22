import { useEffect, useState } from "react";
import Game from "../../classes/game";
import CharacterComponent from "../../components/Character/Character";
import Character from "../../classes/character";
import { CharacterData } from "../../interfaces/Character";
import "./game.css";
import Button from "../../components/Button/Button";
import { useParams } from "react-router-dom";
import { User } from "../../interfaces/User";
import { Room } from "../../interfaces/Room";
import Incendio from "../../classes/Spells/Incendio";
import { io } from "socket.io-client";
import { RoomInfos } from "./Rooms/RoomInfos/RoomInfos";
import { RoomList } from "./Rooms/RoomsList/RoomList";
import PetrificusTotalus from "../../classes/Spells/PetrificusTotalus";
import { Spell } from "../../interfaces/Spell";

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling", "flashsocket"],
});

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
  }, []);

  const fetchData = () => {
    const actualUser = localStorage.getItem("actualUser");

    if (actualUser) {
      const newActualUser = JSON.parse(actualUser);

      console.log(newActualUser);

      setActualUser(newActualUser);

      fetch("http://localhost:3001/rooms")
        .then((res) => res.json())
        .then((data) => {
          checkIfUserIsInRooms(newActualUser, data.rooms);
          setRooms(data.rooms);
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
      [new Incendio(), new PetrificusTotalus()]
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

    socket.emit("updateGame", actualRoom, game);
  };

  const handleTargetSelection = (character: Character) => {
    let target = character;
    setChooseTarget(false);
    handleSpellUse(selectedSpell, target);
  };

  const handleEndGame = () => {
    if (isGameStarted) {
      if (game?.currentPlayer.health <= 0) {
        console.log(game?.endGame());
        setIsGameStarted(false);
      } else {
        setCurrentPlayer(game?.currentPlayer);
      }
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

  const handleCurrentPlayer = (id: number) => {
    if (actualUser?.id === id && currentPlayer?.id === id) {
      return true;
    } else {
      return false;
    }
  };

  const handleLeaveRoom = () => {
    socket.emit("leaveRoom", actualRoom, actualUser);
    setActualRoom(undefined);
    setCurrentPlayer(undefined);
    setCanGameStart(false);
    setIsGameStarted(false);
  };

  useEffect(() => {
    handleEndGame();
  }, [turn]);

  useEffect(() => {
    if (actualRoom) {
      if (!actualRoom.game) {
        const newCharacters = actualRoom.users.map((user) =>
          createClassCharacter(user)
        );

        setCharacters(newCharacters);
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

  return (
    <div className="Game">
      <div className="game-container">
        <div className="game-characters-container">
          {actualRoom &&
            characters.map((character: Character) => (
              <CharacterComponent key={character.id} character={character} />
            ))}
        </div>
        {currentPlayer && (
          <div className="game-players-container">
            <p>Current player : {currentPlayer.firstName}</p>
          </div>
        )}
        <div className="game-spells-container">
          {isGameStarted &&
            currentPlayer &&
            characters.map((character: Character) => {
              if (
                character.id === currentPlayer.id &&
                character.id === actualUser?.id
              )
                return (
                  <div key={character.id} className="game-spells">
                    {character.spells.map((spell: Spell) => {
                      return (
                        <Button
                          key={spell.id}
                          onClick={() => {
                            handleChoseSpell(spell.id);
                          }}
                          className={`${spell.type}-button`}
                          label={spell.name}
                          spell={spell}
                        />
                      );
                    })}
                  </div>
                );
            })}
        </div>
        {chooseTarget && (
          <div className="target-container">
            {actualRoom &&
              characters.map((character: Character) => {
                return (
                  <Button
                    key={character.id}
                    label={character.firstName}
                    onClick={() => handleTargetSelection(character)}
                  />
                );
              })}
          </div>
        )}

        {actualRoom && (
          <Button
            className="leave-room"
            onClick={handleLeaveRoom}
            label="Leave Room"
          />
        )}
      </div>
      {!actualRoom ? (
        <RoomList
          rooms={rooms}
          onCreateRoomClick={createRoom}
          onRoomClick={joinRoom}
        />
      ) : (
        <RoomInfos room={actualRoom} />
      )}
    </div>
  );
};
