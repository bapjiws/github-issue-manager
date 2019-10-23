const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

let socket;
io.on('connection', sock => {
  socket = sock;
  console.log('Connected');
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/issues', (req, res) => {
  socket.emit('Accessed /issues');
  res.send('Let\'s update the issues!');
});

const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Listening on port ${port}`));