// FRONT-END

var socket = io();

// Html elements
var form1 = document.getElementById("form");
var form2 = document.getElementById("name");
var chat = document.getElementById("input-chat");
var nickname = document.getElementById("input-nickname");

// Send information part

// If a message is typed in the chat form
form1.addEventListener("submit", function (e) {
  e.preventDefault(); //Prevent auto-refreshing
  if (chat.value) {
    socket.emit("chat message", chat.value); //Send the message to the server
    chat.value = "";
  }
});

// If a nickname is typed in the nickname form
form2.addEventListener("submit", function (e) {
  e.preventDefault();
  if (nickname.value) {
    socket.emit("user nickname", nickname.value); //Send the nickname to the server
    socket.value = "";
  }
});

// Showing pop up for getting the nickname
function closePopUp() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("form").style.display = "flex";
  document.getElementById("messages").style.display = "block";
}

function showPopUp() {
  document.getElementById("popup").style.display = "block";
  document.getElementById("form").style.display = "none";
  document.getElementById("messages").style.display = "none";
}

// Receive information part

// When a message is received from an user
socket.on("chat message", function (msg, name) {
  // Create the message element
  var item = document.createElement("div");
  var title = document.createElement("label");
  var content = document.createElement("label");

  title.textContent = name;
  content.textContent = msg;

  messages.appendChild(item);

  item.appendChild(title);
  item.appendChild(content);

  // Scroll to the bottom of the chat
  window.scrollTo(0, document.body.scrollHeight);
});

// When a user join the chat
socket.on("user nickname", function (name) {
  // Create the message element
  var item = document.createElement("div");
  var content = document.createElement("label");

  content.textContent = name + " has joined the chat";

  messages.appendChild(item);

  item.appendChild(content);

  // Scroll to the bottom of the chat
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user leave", function (name) {
  // We send the information to all the connected sockets
  var item = document.createElement("div");
  var content = document.createElement("label");

  content.textContent = name + " has left the chat";

  messages.appendChild(item);

  item.appendChild(content);

  // Scroll to the bottom of the chat
  window.scrollTo(0, document.body.scrollHeight);
});
