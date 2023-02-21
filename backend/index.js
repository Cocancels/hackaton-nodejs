const express = require("express");
const app = express();
const http =  require("http");
const cors =  require("cors");
const { Server } = require("socket.io");
// const database = require("./db");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  // transports: ['websocket'], 
  // upgrade: false,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
});

// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

// Rooms data
const rooms = [];

// Socket connection
io.on("connection", (socket) => {
  console.log(`User connected with socket id ${socket.id}`);

  // Get rooms list
  socket.on("getRooms", () => {
    socket.emit("updateRooms", rooms);
  });

  // Create new room
  socket.on("createRoom", (roomName) => {
    let room = {
      roomName: roomName,
      users: [],
    };

    rooms.push(room);
    socket.join(roomName);
    io.emit("updateRooms", rooms);
  });

  // Join a room
  socket.on("joinRoom", ( roomName, usersos ) => {

    if(usersos[0]) {
      let index = rooms.findIndex(room => room.roomName === roomName);
      const roomUsers = rooms[index].users;
  
      if (!roomUsers.includes(usersos[0].username)) {
        roomUsers.push(usersos[0].username);
        socket.join(roomName);
      }
      io.to(roomName).emit("updateRooms", rooms);
    }

  });

  // Leave a room
  socket.on("leaveRoom", (roomName, user) => {
    
    let index = rooms.findIndex(room => room.roomName === roomName);
    const roomUsers = rooms[index].users;

    console.log(roomUsers[0], user.username)

    if(index !== -1) {

        if(roomUsers[0] === user.username) {
          let indexOfUser = roomUsers.indexOf(user.username)
          roomUsers.splice(indexOfUser, 1);
        } 

        rooms[index].users = roomUsers;
        io.to(rooms[index].roomName).emit("updateUsers", rooms);
    }

  });

  // Listen for disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected with socket id ${socket.id}`);

    let index = rooms.findIndex(room => room.users === socket.id);
    if(index !== -1) {
      const roomUsers = rooms[index].users;

      if (index !== -1) {
        roomUsers.splice(index, 1);
        io.to(rooms[index].roomName).emit("updateUsers", rooms);
      }
    }

  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});


