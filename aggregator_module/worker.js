const AWS = require('aws-sdk');
const Consumer = require('sqs-consumer');
const queueUrl = require('../config.js').OUTPUT_QUEUE_URL;
const awsAccess = require('../config.json');

// load aws credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || awsAccess.accessKeyId,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ||awsAccess.secretAccessKey,
  region: process.env.AWS_SQS_REGION || awsAccess.region,
});
// Can use below on local env
//AWS.config.loadFromPath(__dirname + '/config.json');

const consumer = Consumer.create({
  queueUrl: process.env.ES_HOST || queueUrl,
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
