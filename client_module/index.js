const express = require('express');
const data = require('./dataGenerator.js');
const request = require('request-promise');
const worker = require('./worker.js');
const queueUrl = require('../config.js').QUEUE_URL;

const app = express();
const PORT = 3001;

// const sendData = () => {
//   const body = data.userLogOut();
//   const options = {
//     method: 'POST',
//     url: 'http://127.0.0.1:3000/analyze',
//     body,
//     json: true,
//   };
//   request(options)
//     .then(results => console.log('success sending data to analytics', results))
//     .catch(err => console.error('post to analytics module failed', err));

// };

const sendData = () => {
  const body = data.userLogOut();
  const params = {
    MessageBody: JSON.stringify(body),
    QueueUrl: queueUrl,
    DelaySeconds: 0,
  };

  worker.send(params)
    .then(results => console.log('success sending to SQS', results))
    .catch(err => console.error('send to SQS failed', err));
};

sendData();
//setInterval(sendData, 100);

app.listen(PORT, (err) => {
  if (err) {
    console.log('cannot connect to server', err);
  } else {
    console.log(`client module listening on port ${PORT}`);
  }
});
