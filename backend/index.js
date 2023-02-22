const database = require("./db");
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

const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

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

  const sql = `INSERT INTO users (firstname, lastname, house, wins, loses, nickname, password) VALUES ('${firstname}', '${lastname}', '${house}', 0, 0, '${nickname}', '${hashPassword}');
               INSERT INTO user_character (user_id, maxHealth, maxMana, attack) VALUES (LAST_INSERT_ID(), 100, 100, 10);`;

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

  let match = false;
  let user;
  let character;

  database.query(sql, async (err, result) => {
    if (err) {
      return res.status(404).json({ err });
    }

    if (result.length > 0) {
      user = result[0];
      match = await bcrypt.compare(password, user.password);

      if (match) {
        const sql2 = `SELECT * FROM user_character WHERE user_id = '${user.id}'`;

        database.query(sql2, (err, result) => {
          if (err) {
            return res.status(404).json({ err });
          }

          character = result[0];
          user = { ...user, character };
          return res.status(200).json({ user });
        });
      } else {
        return res.status(404).json({ err: "Wrong password" });
      }
    } else {
      return res.status(404).json({ err: "User not found" });
    }
  });
});

app.get("/rooms", (req, res) => {
  return res.status(200).json({ rooms });
});

app.post("/rooms/actualRoom", (req, res) => {
  let actualUser = req.body.actualUser;
  actualUser = JSON.parse(actualUser);

  let actualRoom;

  rooms.map((room) => {
    room.users.map((user) => {
      if (user.id === actualUser.id) {
        actualRoom = room;
      }
    });
  });

  return res.status(200).json({ actualRoom });
});

// Socket connection
io.on("connection", (socket) => {
  socket.on("createRoom", () => {
    const room = {
      id: rooms.length + 1,
      users: [],
      name: "room" + (rooms.length + 1),
      game: null,
      messages: [],
    };

    rooms.push(room);
    socket.join(room.name);
    io.emit("roomCreated", rooms);
  });

  socket.on("joinRoom", (id, actualUser) => {
    let actualRoom;

    rooms.map((room) => {
      if (room.id === id && room.users.length < 2) {
        socket.join(id);

        actualRoom = room;

        return room.users.push(actualUser);
      }
    });

    io.to(id).emit("roomJoined", actualRoom);
  });

  socket.on("startGame", (actualRoom, game) => {
    actualRoom.game = game;
    io.to(actualRoom.id).emit("gameStarted", actualRoom);
  });

  socket.on("updateGame", (actualRoom, game) => {
    actualRoom.game = game;

    io.to(actualRoom.id).emit("gameUpdated", actualRoom);
  });

  socket.on("leaveRoom", (actualRoom, actualUser) => {
    rooms.map((room) => {
      if (room.id === actualRoom.id) {
        room.users = room.users.filter((user) => user.id !== actualUser.id);

        return room;
      }
    });

    const updatedRoom = rooms.find((room) => room.id === actualRoom.id);

    io.to(actualRoom.id).emit("roomLeft", updatedRoom);
    socket.leave(actualRoom.id);
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});
