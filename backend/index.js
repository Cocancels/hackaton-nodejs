const express = require("express");
const http = require("http");
const socketIo = require("socket.io", {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
const server = http.createServer(app);

const io = socketIo(server);

// Rooms data
const rooms = [];

app.post("/register", async (req, res) => {
  let firstname = req.body.firstName;
  let lastname = req.body.lastName;
  let house = req.body.house;
  let nickname = req.body.nickName;
  let password = req.body.password;

  let x = bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then((hash) => {
      return hash;
    })
    .catch((err) => console.error(err.message));

  let hashPassword = await x;

  const sql = `INSERT INTO users (firstname, lastname, house, wins, loses, nickname, password)
               VALUES ('${firstname}', '${lastname}', '${house}', 0, 0, '${nickname}', '${hashPassword}')`;

  database.query(sql, (err, result) => {
    if (err) {
      return res.status(404).json({ err });
    }
    res.send(result);
  });
});

app.post("/login", async (req, res) => {
  const nickname = req.body.nickName;
  const password = req.body.password;

  const sql = `SELECT * FROM users WHERE nickname = '${nickname}'`;
  database.query(sql, async (err, result) => {
    if (err) {
      return res.status(404).json({ err });
    }

    if (result.length > 0) {
      const user = result[0];
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        return res.status(200).json({ user });
      } else {
        return res.status(404).json({ err: "Wrong password" });
      }
    } else {
      return res.status(404).json({ err: "User not found" });
    }
  });
});

// Socket connection
io.on("connection", (socket) => {
  // console.log(`User connected with socket id ${socket.id}`);

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
    console.log(rooms);
    socket.join(roomName);
    io.to(roomName).emit("updateRooms", rooms);
  });

  // Join a room
  socket.on("joinRoom", (roomName, usersos) => {
    if (usersos[0]) {
      let index = rooms.findIndex((room) => room.roomName === roomName);
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
    let index = rooms.findIndex((room) => room.roomName === roomName);
    const roomUsers = rooms[index].users;

    console.log(roomUsers[0], user.username);

    if (index !== -1) {
      if (roomUsers[0] === user.username) {
        let indexOfUser = roomUsers.indexOf(user.username);
        roomUsers.splice(indexOfUser, 1);
      }

      rooms[index].users = roomUsers;
      io.to(rooms[index].roomName).emit("updateUsers", rooms);
    }
  });

  // Listen for disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected with socket id ${socket.id}`);

    let index = rooms.findIndex((room) => room.users === socket.id);
    if (index !== -1) {
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
