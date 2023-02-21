const express = require("express");
const app = express();
const http =  require("http");
const cors =  require("cors");
const { Server } = require("socket.io");
const database = require("./db");
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

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

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
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});


