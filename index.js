const http = require('http');
const express = require('express');
const app = express(); //express ka app bna lia hai
const path = require('path');

//not directily listen to app.listen so http require krenge


const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server); // this will handle socket io

//Socket.io

io.on("connection", (socket) => {
    // console.log("A new User connected", socket.id);
    socket.on('user-message', (message) => {
        // console.log('A new User message', message);
        //send to every client
        io.emit('message', message);
    })
})

app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
    return res.sendFile('/public/index.html');
})

server.listen(9000, () => console.log(`Listening on port ${9000}`))