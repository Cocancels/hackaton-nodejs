import { useEffect, useState } from "react";
import { Room } from "../../../../interfaces/Room";
import { User } from "../../../../interfaces/User";
import "./RoomList.css";
interface RoomListProps {
  rooms: Room[];
  onRoomClick: (roomId: number) => void;
  onCreateRoomClick: () => void;
}

export const RoomList = (props: RoomListProps) => {
  const { rooms, onRoomClick, onCreateRoomClick } = props;
  const [actualUser, setActualUser] = useState<User>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const actualUser = localStorage.getItem("actualUser");

    if (actualUser) {
      const newActualUser = JSON.parse(actualUser);

      setActualUser(newActualUser);

      fetch("http://localhost:3001/rooms").then((res) => res.json());
    }
  };

  return (
    <>
      <div
        className={` background container-inscription container-color-${
          actualUser &&
          ((actualUser.house === "Serpentard" && "serp") ||
            (actualUser.house === "2" && "grif") ||
            (actualUser.house === "3" && "serd") ||
            (actualUser.house === "4" && "pouf"))
        } `}
      ></div>
      <div className={"room-list"}>
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
    </>
  );
};
