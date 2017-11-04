const AWS = require('aws-sdk');
const Consumer = require('sqs-consumer');
const queueUrl = require('../../config.js').INPUT_QUEUE_URL;
const awsAccess = require('../../config.json');
const processData = require('./process.js').process;

// load aws credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || awsAccess.accessKeyId,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || awsAccess.secretAccessKey,
  region: process.env.AWS_SQS_REGION || awsAccess.region,
});
// AWS.config.loadFromPath(__dirname + '/config.json');

const consumer = Consumer.create({
  queueUrl: process.env.SQS_INPUT_URL || queueUrl,
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
