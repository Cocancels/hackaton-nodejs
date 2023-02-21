import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Room } from "../../interfaces/Room";
import { io } from "socket.io-client";

export const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [actualUser, setActualUser] = useState<any>(null);
  const [roomName, setRoomName] = useState<string>("");

  var socket = io("http://localhost:3001", {
    transports: ["websocket", "polling", "flashsocket"],
    autoConnect: false,
  });

  useEffect(() => {
    const actualUser = localStorage.getItem("actualUser");

    if (actualUser) {
      setActualUser(JSON.parse(actualUser));
    }
  }, []);

  const handleCreateRoom = () => {
    socket.emit("createRoom", roomName);
  };

  return (
    <div>
      <p>Rooms</p>

      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <Link to={`/rooms/${room.id}`}>{room.name}</Link>
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />

      <button onClick={handleCreateRoom}>Create a room</button>
    </div>
  );
};
