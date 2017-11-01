const router = require('express').Router();
const worker = require('./worker.js');
const queueUrl = require('../config.js');


const processData = () => {
  let params = {
    QueueUrl: queueUrl.OUTPUT_QUEUE_URL,
    VisibilityTimeout: 300,
  };
  worker.receiveSQS(params)
    .then((data) => {
      params = {
        QueueUrl: queueUrl.OUTPUT_QUEUE_URL,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };
      return worker.deleteSQS(params);
    })
    .catch((err) => {
      console.log(err);
    });
};

setInterval(processData, 1000);

module.exports = router;