//BACK-END

// Modules
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

// For CSS and client JS files
app.use(express.static(__dirname));

// Load HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Object of connected players (socket.id:nickname)
var onlineUsers = {};

// An new connexion etablished
io.on("connection", (socket) => {
  var id = socket.id;
  var nickname;

  // The connexion close
  socket.on("disconnect", (socket) => {
    //If the connected user was registred in online users
    if (Object.keys(onlineUsers).includes(id)) {
      delete onlineUsers[id]; //We remove him from the object
      // We send the information to all the connected sockets
    }
    io.emit("user leave", nickname);
  });

  // The connected user send a message in the chat
  socket.on("chat message", (msg) => {
    // We send the information to all the connected sockets
    io.emit("chat message", msg, nickname);
  });

  // The user is register his nickname
  socket.on("user nickname", (input) => {
    nickname = input;
    onlineUsers[id] = nickname;

    // We send the information to all the connected sockets
    io.emit("user nickname", nickname);
  });
});

// Lancement du serveur
server.listen(3000, () => {
  console.log("Listening on *3000");
});
