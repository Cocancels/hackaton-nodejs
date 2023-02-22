import * as io from "socket.io-client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

const Rooms = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [newRoom, setNewRoom] = useState<string>("");

  const [users, setUsers] = useState<string[]>([]);
  const [user, setUser] = useState<string>("");
  const [storedUser, setStoredUser] = useState<string | null>(localStorage.getItem('user'));

  const handleNewRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user !== "" && newRoom !== "") {
      const isDuplicateRoom = rooms.some((room) => room.room === newRoom);
      if (isDuplicateRoom) {
        alert("This room already exists!");
        return;
      }

      socket.emit("newRoom", { newRoom });
      setNewRoom("");
    }
  }

  const handleNewUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem('user', user);
    setStoredUser(user);
  }

  useEffect(() => {
    if(localStorage.getItem('user')) setUser(localStorage.getItem('user')!)

    socket.on("rooms", (roomsSocket: any[]) => {
      setRooms(roomsSocket);
    });

  }, []);

  return (
    <section id="rooms">

      <form onSubmit={handleNewUser}>
        <input
          type="text"
          placeholder="Enter your name"
          value={storedUser !== null ? storedUser : user}
          readOnly={storedUser !== null ? true : false}
          onChange={(e) => setUser(e.target.value)}
        />&nbsp;
        {!storedUser && (
          <button type="submit">Submit your name</button>
        )}
      </form>
      <br />

      <form onSubmit={handleNewRoom}>
        <input
          type="text"
          placeholder="Enter a new room name"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
        />&nbsp;
        <button type="submit">Create room</button>
      </form>
      <ul>
        {rooms.map((room, index) => (
          <li key={room.room + index}>
            {room.users.length < 2 ? (
              <Link to={`/rooms/${room.room}`}>
                {room.room} ({room.users.length} users)
              </Link>
            ) : (
              <p>
                {room.room} (You can't go there it's already {room.users.length} users)
              </p>
            )}
          </li>
        ))}
      </ul>

    </section>
  )
}

export default Rooms;