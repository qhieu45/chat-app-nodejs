const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app)
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected!');

    socket.emit('newMessage', {
        from: 'admin',
        text: 'Welcome to the chat room',
        createdAt: new Date().getTime()  
    });

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'New user has joined the chat room!!',
        createdAt: new Date().getTime()

    })

    socket.on('createMessage', (message) => {
        console.log(`New message created: `, message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
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