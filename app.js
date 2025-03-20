const express = require('express');
const user = require('./routes/users.js');
const app = express();
const port = 8001;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get('/data/user', user);

app.post('/data/user', user);

app.listen(port, () => {
  console.log(`서버 구동 중..(http://localhost:${port})`);
})