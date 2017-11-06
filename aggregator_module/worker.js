const AWS = require('aws-sdk');
const Consumer = require('sqs-consumer');
const config = require('../config.js');


// load aws credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_AD || config.AWS_ACCESS_KEY_ID_AD,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_AD ||config.AWS_SECRET_ACCESS_KEY_AD,
  region: process.env.AWS_SQS_REGION || awsAccess.AWS_SQS_REGION,
});

const consumer = Consumer.create({
  queueUrl: process.env.SQS_OUTPUT_URL || config.SQS_OUTPUT_URL,
  waitTimeSeconds: 10,
  handleMessage: (message, done) => {
    console.log('AD got the message', message);
    done();
  },
  sqs: new AWS.SQS(),
});

module.exports = {
  consumer,
};
