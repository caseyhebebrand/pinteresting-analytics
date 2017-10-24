const express = require('express');
const data = require('./dataGenerator.js');
const request = require('request-promise');

const app = express();
const PORT = 3001;

const sendData = () => {
  let body = data.userLogOut();
  let options = {
    method: 'POST',
    url: 'http://127.0.0.1:3000/analyze',
    body: body,
    json: true,
  };
  
  request(options)
  .then( data => console.log('success sending data to analytics', data))
  .catch( err => console.error('post to analytics module failed', err));

  setInterval(sendData, 5000);
};

sendData();

app.listen(PORT, (err) => {
  if (err) {
    console.log('cannot connect to server', err);
  } else {
    console.log(`client module listening on port ${PORT}`);
  }
});
