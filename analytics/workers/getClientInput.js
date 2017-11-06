const AWS = require('aws-sdk');
const Consumer = require('sqs-consumer');
const config = require('../../config.js');
const processData = require('./process.js').processData;

// load aws credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_AD || config.AWS_ACCESS_KEY_ID_AD,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_AD || config.AWS_SECRET_ACCESS_KEY_AD,
  region: process.env.AWS_SQS_REGION || config.AWS_SQS_REGION,
});
// AWS.config.loadFromPath(__dirname + '/config.json');

const consumer = Consumer.create({
  queueUrl: process.env.SQS_INPUT_URL || config.SQS_INPUT_URL,
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
