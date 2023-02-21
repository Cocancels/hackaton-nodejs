const express = require("express");
const app = express();
const http =  require("http");
const cors =  require("cors");
const { Server } = require("socket.io");
const database = require("./db");

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

app.post("/register",  (req, res) => {

  let firstname = req.body.firstName;
  let lastname = req.body.lastName;
  let house = req.body.house;

  const sql = `INSERT INTO users (firstname, lastname, house)
       VALUES ('${firstname}','${lastname}', '${house}')`;

  database.query(sql, (err, result) => {
    if(err){
      return res.status(404).json({ err });
    }
    res.send(result);

  });


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


