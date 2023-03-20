import express from 'express';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import http from 'http'; 
import cors from 'cors';

const app = express();
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:5173',
    }
});

app.use(cors())
app.use(morgan('dev')); 

io.on('connection', (socket) => {
    socket.on('messages',(messages) => {
        console.log(messages);
        socket.broadcast.emit('messages', {
            body: messages,
            from: socket.id
        });
    })
})


server.listen(4000)
console.log("Server listening on port 4000");