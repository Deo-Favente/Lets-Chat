var socket = io();

// Récupération de l'input de chat
var form = document.getElementById("form");
// Récupération du bouton d'envoi
var input = document.getElementById("input");

// Si un message est envoyé depuis l'input
form.addEventListener("submit", function (e) {
  e.preventDefault(); //Cancel l'action de base de l'input
  if (input.value) {
    socket.emit("chat message", input.value); //Envoie le message aux sockets connectés
    input.value = "";
  }
});

socket.on("chat message", function (msg) { //A la réception d'un message
  // Création d'une nouvelle box avec le message
  var item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
