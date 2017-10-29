const express = require('express');
const data = require('./dataGenerator.js');
const request = require('request-promise');

const app = express();
const PORT = 3001;

const sendData = () => {
  const body = data.userLogOut();
  const options = {
    method: 'POST',
    url: 'http://127.0.0.1:3000/analyze',
    body,
    json: true,
  };
  request(options)
    .then(results => console.log('success sending data to analytics', results))
    .catch(err => console.error('post to analytics module failed', err));

};

//sendData();
setInterval(sendData, 100);

app.listen(PORT, (err) => {
  if (err) {
    console.log('cannot connect to server', err);
  } else {
    console.log(`client module listening on port ${PORT}`);
  }
});
