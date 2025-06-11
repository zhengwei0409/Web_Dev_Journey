import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080});

interface User {
    socket: WebSocket;
    room: string
}

let allSockets : User[] = [];

wss.on('connection', (socket) => {

    socket.on('message', (e) => {
         const parsedMessage = JSON.parse(e.toString());

        if(parsedMessage.type === 'join') {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }

        if(parsedMessage.type === 'chat') {
            let currentUserRoom : string;
            allSockets.forEach((s) => {
                if(s.socket === socket) {
                    currentUserRoom = s.room;
                }
            })

            allSockets.forEach((s) => {
                if(s.room === currentUserRoom) {
                    s.socket.send(parsedMessage.payload.message);
                }
            })
        }

    })


})