// dependencies
const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;

const server = express().listen(3000, () => {
    console.log('Server Started at Port 3000 🚀');
});

const wss = new SocketServer({ server });

wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

wss.on('connection', (ws) => {
    console.log('[Server Says] Client Connected 🖥️');
    ws.id = wss.getUniqueID();

    ws.on('close', () => { 
        console.log('[Server Says] Client Disconnected 🖥️') 
    });

    ws.on('message', (message) => {
        // broadcast to everyone else connected
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(client.id + ": " + message);
            }
        });
    });
});