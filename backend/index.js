const express = require("express");
const app = express();
const http =  require("http");
const cors =  require("cors");
const { Server } = require("socket.io");
// const database = require("./db");
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
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

app.post("/register",  async (req, res) => {

  let firstname = req.body.firstName;
  let lastname = req.body.lastName;
  let house = req.body.house;
  let nickname = req.body.nickName;
  let password = req.body.password;

  let x = bcrypt
      .genSalt(10)
      .then(salt => {
        return bcrypt.hash(password, salt)
      })
      .then(hash => {
        return hash
      })
      .catch(err => console.error(err.message))

  let hashPassword = await x

  const sql = `INSERT INTO users (firstname, lastname, house, nickname, password)
               VALUES ('${firstname}', '${lastname}', '${house}', '${nickname}', '${hashPassword}')`;

  database.query(sql, (err, result) => {
    if (err) {
      return res.status(404).json({err});
    }
    res.send(result);

  });
});

app.post("/login",  async (req, res) => {

  res.send({test: "test"});

});

io.on("connection", (socket) => {
  console.log(`User connected with socket id ${socket.id}`);

  io.emit("rooms", rooms);

  socket.on("newRoom", (data) => {
    const { newRoom } = data;

    rooms.push({
      room: newRoom,
      users: []
    })

    io.emit("rooms", rooms);
  })

  socket.on("updateRoom", (data) => {
    const { roomName, storedUser } = data;

    let index = rooms.findIndex(room => room.room === roomName);
  
    if(index !== -1) {
  
      let roomUsers = rooms[index].users;
      let user = roomUsers.find(u => u.name === storedUser);
      if(!user) {
        user = { name: storedUser, data: {
          health: 100
        } };
        roomUsers.push(user);
      }
  
      io.emit("rooms", rooms);
    }
  });

  socket.on("leaveRoom", (data) => {
    const { roomName, storedUser } = data;

    let index = rooms.findIndex(room => room.room === roomName);

    if(index !== -1) {
      let roomUsers = rooms[index].users;
      let userIndex = roomUsers.findIndex(user => user.name === storedUser);
      if(userIndex !== -1) {
        roomUsers.splice(userIndex, 1);
      }
    }

    io.emit("rooms", rooms);
  });

  socket.on("userPunched", (data) => {
    const { roomName, puncher } = data;

    let index = rooms.findIndex(room => room.room === roomName);
    
    if(index !== -1) {
      let roomUsers = rooms[index].users;
      let puncherIndex = roomUsers.findIndex(user => user.name === puncher);
      if(puncherIndex !== -1) {
        let punchedIndex = roomUsers.findIndex(user => user.name !== puncher);
        if(punchedIndex !== -1) {
          if(rooms[index].users[punchedIndex].data.health !== 0)
            rooms[index].users[punchedIndex].data.health -= 10;
        }
      }
    }

    io.emit("rooms", rooms);
  });

  socket.on("userHealed", (data) => {
    const { roomName, toBeHealed } = data;

    let index = rooms.findIndex(room => room.room === roomName);
    
    if(index !== -1) {
      let roomUsers = rooms[index].users;
      let toBeHealedIndex = roomUsers.findIndex(user => user.name === toBeHealed);
      if(toBeHealedIndex !== -1) {
        if(rooms[index].users[toBeHealedIndex].data.health < 100)
          rooms[index].users[toBeHealedIndex].data.health += 10;
      }
    }

    io.emit("rooms", rooms);
  });

  socket.on('newMessage', (data) => {
    const { roomName, sender, content, timestamp } = data;

    // Find the room with the given name
    const roomIndex = rooms.findIndex(room => room.room === roomName);
    if (roomIndex === -1) {
      // Room does not exist
      return;
    }
  
    // Get the users in the room
    const roomUsers = rooms[roomIndex].users;
  
    // Find the user who sent the message
    const senderIndex = roomUsers.findIndex(user => user.name === sender);
    if (senderIndex === -1) {
      // User does not exist in the room
      return;
    }
  
    // Broadcast the message to all other users in the room
    const messageData = { sender, content, timestamp };
    io.emit('message', messageData);
  });
  

  socket.on("disconnect", () => {
    console.log(`User disconnected with socket id ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});


