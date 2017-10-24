const express = require('express');
const data = require('./dataGenerator.js');
const request = require('request-promise')

const app = express();
const PORT = 3001;

const sendData = () {
  let body = data.userLogOut();
  let options = {
    method: 'POST',
    url: 'https://127.0.0.1/analyze',
    body: body,
    json: true,
  }
  
  request(options)
  .then( data => console.log('success sending data to analytics', data))
  .catch( err => console.error('post to analytics module failed', err));

  let times = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
  let timeElapsed = Math.floor(Math.random() * 9);
  setInterval(sendData, timeElapsed);
};

app.listen(PORT, (err) => {
  if (err) {
    console.log('cannot connect to server', err);
  } else {
    console.log(`client module listening on port ${PORT}`);
  }
});
