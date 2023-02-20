const express = require("express");
const app = express();
const db = require("./db");

// Create a new HTTP server using the express app
const server = require("http").createServer(app);

// Create a new Socket.IO server using the HTTP server
const io = require("socket.io")(server);

// Define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start the server and listen for incoming connections
server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// Listen for incoming socket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for incoming chat messages
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });

  // Listen for disconnect events
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
