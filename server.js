// TODO: use imports.

const express = require('express');
const app = express();
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let websocket;

// Requires the client to send a GET request to complete the handshake.
wss.on('connection', ws => {
  websocket = ws;

  // TODO: don't need this one.
  ws.on('message', message => {
    console.log('received: %s', message);
  });
});

app.get('/issues', (req, res) => {
  console.log('RECEIVED');
  websocket.send('Accessed /issues');
  // TODO: just send 200.
  res.send('Hello, GitHub!');
});

app.listen(5000, () => console.log('Listening...'));