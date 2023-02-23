import { Room } from "../../../../interfaces/Room";

interface RoomListProps {
  rooms: Room[];
  onRoomClick: (roomId: number) => void;
  onCreateRoomClick: () => void;
}

export const RoomList = (props: RoomListProps) => {
  const { rooms, onRoomClick, onCreateRoomClick } = props;

  return (
    <div>
      {rooms.map((room) => (
        <div onClick={() => onRoomClick(room.id)} key={room.id}>
          <h2>{room.name}</h2>
        </div>
      ))}
      <button onClick={onCreateRoomClick}>Create room</button>
    </div>
  );
};
