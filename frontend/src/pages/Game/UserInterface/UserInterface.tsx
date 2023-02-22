import Character from "../../../classes/character";
import { Room } from "../../../interfaces/Room";
import { User } from "../../../interfaces/User";
import { SpellSelection } from "./SpellSelection/SpellSelection";
import { RoomInfos } from "../Rooms/RoomInfos/RoomInfos";
import "./UserInterface.css";
import { RoomList } from "../Rooms/RoomsList/RoomList";

interface UserInterfaceProps {
  characters: Character[];
  rooms: Room[];
  currentPlayer: Character | undefined;
  actualUser: User | undefined;
  actualRoom: Room | undefined;
  isGameStarted: boolean;
  chooseTarget: boolean;
  onCreateRoomClick: () => void;
  onRoomClick: (roomId: number) => void;
  handleChoseSpell: (spellId: number) => void;
  handleTargetSelection: (character: Character) => void;
}

export const UserInterface = (props: UserInterfaceProps) => {
  const {
    characters,
    currentPlayer,
    actualUser,
    actualRoom,
    isGameStarted,
    chooseTarget,
    handleChoseSpell,
    handleTargetSelection,
  } = props;

  return (
    <div className="user-interface">
      <SpellSelection
        characters={characters}
        currentPlayer={currentPlayer}
        actualUser={actualUser}
        actualRoom={actualRoom}
        isGameStarted={isGameStarted}
        isChoosingTarget={chooseTarget}
        chooseTarget={chooseTarget}
        handleTargetSelection={handleTargetSelection}
        handleChoseSpell={handleChoseSpell}
      />

      <RoomInfos room={actualRoom} />
    </div>
  );
};
