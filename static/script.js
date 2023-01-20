// FRONT-END

var socket = io();

// Html elements
var form1 = document.getElementById("form");
var form2 = document.getElementById("name");
var chat = document.getElementById("input-chat");
var nickname = document.getElementById("input-nickname");

var counter = document.getElementById("counter");
var userList = document.getElementById("user-list");

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
  closePopUp();
  console.log("nickname");
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
  document.getElementById("header").style.display = "flex";
}

function showPopUp() {
  document.getElementById("popup").style.display = "block";
  document.getElementById("form").style.display = "none";
  document.getElementById("messages").style.display = "none";
  document.getElementById("header").style.display = "none";
}

// Receive information part

// When a message is received from the server
socket.on("chat message", function (msg, name) {
  // Create the message element
  var item = document.createElement("li");
  var content = document.createElement("div");
  var sender = document.createElement("span");
  var text = document.createElement("span");
  var date = document.createElement("span");

  sender.textContent = name;
  text.textContent = msg;
  date.textContent = new Date().toLocaleString();

  sender.className = "sender";
  text.className = "text";
  date.className = "date";
  item.className = "message";
  content.className = "content";

  messages.appendChild(item);

  item.appendChild(content);
  item.appendChild(date);
  content.appendChild(sender);
  content.appendChild(text);

  // Scroll to the bottom of the chat
  window.scrollTo(0, document.body.scrollHeight);
});

// When a user join the chat
socket.on("user nickname", function (name, onlineUsers) {

  // Counter
  userList.innerHTML = "";
  for (var key in onlineUsers) {
    userList.innerHTML += onlineUsers[key] + " ";
  }
  var size = Object.keys(onlineUsers).length;
  counter.innerHTML = size;

  // Create the message element
  var item = document.createElement("li");
  var content = document.createElement("div");
  var sender = document.createElement("span");
  var text = document.createElement("span");
  var date = document.createElement("span");

  sender.textContent = "Server";
  text.textContent = name + " joined the chat.";
  date.textContent = new Date().toLocaleString();

  sender.className = "sender";
  text.className = "text";
  date.className = "date";
  item.className = "message server";
  content.className = "content";

  messages.appendChild(item);

  item.appendChild(content);
  item.appendChild(date);
  content.appendChild(sender);
  content.appendChild(text);

  // Scroll to the bottom of the chat
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user leave", function (name, onlineUsers) {
  // Counter
  userList.innerHTML = "";
  for (var key in onlineUsers) {
    userList.innerHTML += onlineUsers[key] + " ";
  }
  var size = Object.keys(onlineUsers).length;
  counter.innerHTML = size;

  // Create the message element
  var item = document.createElement("li");
  var content = document.createElement("div");
  var sender = document.createElement("span");
  var text = document.createElement("span");
  var date = document.createElement("span");

  sender.textContent = "Server";
  text.textContent = name + " left the chat.";
  date.textContent = new Date().toLocaleString();

  sender.className = "sender";
  text.className = "text";
  date.className = "date";
  item.className = "message server";
  content.className = "content";

  messages.appendChild(item);

  item.appendChild(content);
  item.appendChild(date);
  content.appendChild(sender);
  content.appendChild(text);

  // Scroll to the bottom of the chat
  window.scrollTo(0, document.body.scrollHeight);
});
