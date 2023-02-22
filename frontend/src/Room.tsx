import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as io from "socket.io-client";

interface User {
  name: string;
  data: {
    health: number;
  }
}

interface Room {
  room: string;
  users: User[];
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
};

const socket = io.connect("http://localhost:3001");

const Room = () => {
  const [room, setRoom] = useState<Room>({ room: "", users: [] });
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const roomName = id;
  const navigate = useNavigate();

  const [storedUser, setStoredUser] = useState<string | null>(
    localStorage.getItem("user")
  );

  if (!storedUser) navigate("/rooms");

  const dealPunch = () => {
    const puncher = storedUser;
    socket.emit("userPunched", { roomName, puncher });
  };

  const dealHealing = () => {
    const toBeHealed = storedUser;
    socket.emit("userHealed", { roomName, toBeHealed });
  }

  const convertDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const frenchDate = date.toLocaleString("fr-FR", { 
      // year: "numeric",
      // month: "long",
      // day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "Europe/Paris",
    });

    return frenchDate;
  }
 


  const handleNewMessage = () => {
    const sender = storedUser;

    if (message) {
      const timestamp = new Date();
      socket.emit("newMessage", { roomName, sender: sender, content: message, timestamp });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("message", ({ sender, content, timestamp }) => {
      setMessages((prevMessages) => [...prevMessages, { content, sender, timestamp }]);
    });
    return () => {
      socket.off("message");
    }
  }, [socket]);

  useEffect(() => {
    socket.emit("updateRoom", { roomName, storedUser });

    return () => {
      socket.emit("leaveRoom", { roomName, storedUser });
    };
  }, [roomName, storedUser]);

  useEffect(() => {
    socket.on("rooms", (roomsSocket: Room[]) => {
      let index = roomsSocket.findIndex((room) => room.room === roomName);
      if (index !== -1) {
        setRoom({
          room: roomsSocket[index].room,
          users: roomsSocket[index].users,
        });
      }
    });
  }, [roomName]);

  return (
    <div>
      <h1>Room : {roomName}</h1>

      <br />
      <ul>
        {room &&
          room.users.map((user, index) => (
            <li key={index}>
              {user.name} {user.data.health}
            </li>
          ))}
      </ul>

      <button onClick={() => dealPunch()}>Punch</button> &nbsp;
      <button onClick={() => dealHealing()}>Heal</button>

      <br />
      <br />
      <button onClick={() => navigate("/rooms")}>Disconnect From Room</button>




      <br /><br />
      <input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleNewMessage();
          }
        }}
      />
      <button onClick={handleNewMessage}>Send</button>

      <br /><br />
      <h2>Messages:</h2>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>
             <strong>{message.sender}:</strong>  {message.content} ({
              convertDate(message.timestamp)
            })
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Room;