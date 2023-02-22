import { Room } from "../../../../interfaces/Room";
import "./RoomList.css";
interface RoomListProps {
  rooms: Room[];
  onRoomClick: (roomId: number) => void;
  onCreateRoomClick: () => void;
}

export const RoomList = (props: RoomListProps) => {
  const { rooms, onRoomClick, onCreateRoomClick } = props;

  return (
    <div className="room-list">
      {rooms.map((room) => (
        <div
          className="room-button"
          onClick={() => onRoomClick(room.id)}
          key={room.id}
        >
          <h2>{room.name}</h2>
        </div>
      ))}
      <button className="create-room-button" onClick={onCreateRoomClick}>
        Create room
      </button>
    </div>
  );
};
