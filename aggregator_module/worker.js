const AWS = require('aws-sdk');
const Consumer = require('sqs-consumer');
const queueUrl = require('../config.js').OUTPUT_QUEUE_URL;

// load aws credentials
AWS.config.loadFromPath(__dirname + '/config.json');

const consumer = Consumer.create({
  queueUrl,
  waitTimeSeconds: 10,
  handleMessage: (message, done) => {
    console.log('AD got the message', message)
    done();
  },
  sqs: new AWS.SQS(),
});

module.exports = {
  consumer,
};
