import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'

import * as io from "socket.io-client";

import { RoomInfo } from "./Rooms";

const socket = io.connect("http://localhost:3001");

export interface UserInfo {
  username: string;
}

const Room = () => {
  const { id } = useParams<{ id: string }>();
  const roomName = id;
  const [numUsers, setNumUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<UserInfo[]>([]);
  const navigate = useNavigate();

  const disconnectFromRoom = () => {
    socket.emit("leaveRoom", roomName, users[0]);
    navigate("/rooms");
  }

  if (roomName !== "") {
    const newUser: UserInfo = {
      username: username
    }

    socket.emit("joinRoom", roomName, users);
  }

  useEffect(() => {

    if(localStorage.getItem('users')) {
      const userJson = localStorage.getItem('users');
      setUsers(userJson ? JSON.parse(userJson) : [])
    }
    console.log(users);

    socket.on("updateRooms", (rooms) => {
      console.log(rooms);
      let index = rooms.findIndex((room: RoomInfo) => room.roomName === roomName);
      const roomUsers = rooms[index].users;
        console.log(rooms);
        setNumUsers((rooms[index].users).length);
    });

    socket.emit("getRooms", roomName);

  }, [socket]);

  return (
    <div>
      <h1>{roomName}</h1>
      <p>Number of users: {numUsers}</p>

      <button
        onClick={() => disconnectFromRoom()}
      >Disconnect From Room
      </button>
    </div>
  );
}

export default Room