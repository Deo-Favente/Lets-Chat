// Modules
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const server = http.createServer(app)
const io = new Server(server);

// Pour les fichiers statics (css & js)
app.use(express.static(__dirname));

// Pour le fichier html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

// Nouvelle connexion
io.on('connection', (socket) => {

    console.log('A new user join the chat.')

    // Déconnexion de l'utilisateur
    socket.on('disconnect', () => {
        console.log('An user disconnected.')
    });

    // Message envoyé par l'utilisateur
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    });
});

// Lancement du serveur
server.listen(3000, () => {
    console.log('Listening on *3000')
});

