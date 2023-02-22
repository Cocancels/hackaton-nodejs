import { Room } from "../../../../interfaces/Room";
import "./RoomInfos.css";

interface RoomInfosProps {
  room: Room | undefined;
}

export const RoomInfos = (props: RoomInfosProps) => {
  const { room } = props;

  return (
    <div className="room-infos-container">
      <h1>Room Infos</h1>
      <h2>Nom: {room?.name}</h2>
      <ul>
        {room?.users.map((user) => (
          <li key={user.id}>{user.nickname}</li>
        ))}
      </ul>
    </div>
  );
};
