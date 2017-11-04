const express = require('express');
const data = require('./dataGenerator.js');
const worker = require('./worker.js');
const queueUrl = require('../config.js');

const app = express();
const PORT = 2020;

const sendData = () => {
  const body = data.userLogOut();
  const params = {
    MessageBody: JSON.stringify(body),
    QueueUrl: process.env.SQS_INPUT_URL || queueUrl.INPUT_QUEUE_URL,
    DelaySeconds: 0,
  };

  worker.send(params)
    .then(results => console.log('success sending to SQS', results))
    .catch(err => console.error('send to SQS failed', err));
};


setInterval(sendData, 80);

app.listen(PORT, (err) => {
  if (err) {
    console.log('cannot connect to server', err);
  } else {
    console.log(`client module listening on port ${PORT}`);
  }
});
