import * as io from "socket.io-client";
import { useEffect, useState } from "react";

import { Link } from 'react-router-dom';

import Room from "./Room";

const socket = io.connect("http://localhost:3001");

export interface RoomInfo {
  roomName: string;
  users: string[];
}

export interface  UserInfo {
  username: string;
}

function Rooms() {
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [newRoom, setNewRoom] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<UserInfo[]>([]);

  const handleNewRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newRoom !== "") {
      socket.emit("createRoom", newRoom);
      setNewRoom("");
    }
  };

  useEffect(() => {

    if(localStorage.getItem('users')) {
      // console.log('HeLO')
      const userJson = localStorage.getItem('users');
      setUsers(userJson ? JSON.parse(userJson) : []);
      // console.log(users[0]); 

      // let input = document.getElementById('username');
      // console.log(input)
      // (input as HTMLInputElement).value = "Adil";
      // (input as HTMLInputElement).setAttribute('readOnly', "true");

      // document.querySelector<HTMLInputElement>('#username').value = "Adil"
    }
    // console.log(users);

    let updatedRooms;
    socket.on("updateRooms", (roomList: RoomInfo[]) => {
      updatedRooms = roomList.map((room: RoomInfo) => {
        return {
          roomName: room.roomName,
          users: room.users
        }
      });
      setRooms(updatedRooms);
    });

    socket.emit("getRooms", updatedRooms);
  }, []);

  return (
    <div>
      <h1>Harry Potter Match Game</h1>

      <input
        type="text"
        placeholder="Enter your name"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => {
        const newUser: UserInfo = {
          username: username
        }

        const newUsers = [...users, newUser]
        setUsers(newUsers);
        localStorage.setItem("users", JSON.stringify(newUsers));
      }}>Set Username</button>
      <br />
      <br />

      <form onSubmit={handleNewRoom}>
        <input
          type="text"
          placeholder="Enter a new room name"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
        />
        <button type="submit">Create room</button>
      </form>
      <ul>
        {rooms.map((room) => (
          <li key={room.roomName}>
            <Link to={`/rooms/${room.roomName}`}>
              {room.roomName} ({(room.users).length} users)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;