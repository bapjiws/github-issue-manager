// TODO: use imports.

const express = require('express');
const app = express();

app.get('/issues', function (req, res) {
  console.log('RECEIVED');
  res.send('Hello, GitHub!');
});

app.listen(3000, () => console.log('Listening...'));