const AWS = require('aws-sdk');
const Consumer = require('sqs-consumer');
const queueUrl = require('../../config.js').INPUT_QUEUE_URL;
const processData = require('./process.js').process;

// load aws credentials
AWS.config.loadFromPath(__dirname + '/config.json');

const consumer = Consumer.create({
  queueUrl,
  waitTimeSeconds: 10,
  handleMessage: (message, done) => {
    processData(message.Body);
    done();
  },
  sqs: new AWS.SQS(),
});

module.exports = {
  consumer,
};
