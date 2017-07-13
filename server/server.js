const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app)
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected!');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined the chat room!'));

    socket.on('createMessage', (message, callback) => {
        console.log(`New message created: `, message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from server');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected!`);
    });
})

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
})