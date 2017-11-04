const AWS = require('aws-sdk');
const awsAccess = require('../config.json');

// load aws credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || awsAccess.accessKeyId,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || awsAccess.secretAccessKey,
  region: process.env.AWS_SQS_REGION || awsAccess.region,
});
// Can use below on local env
// AWS.config.loadFromPath(__dirname + '/config.json');

// Instantiate SQS
const sqs = new AWS.SQS();

const send = (params) => {
  return new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) {
        console.error('error sending message to SQS:', err);
        reject(err);
      } else {
        console.log('success sending message to SQS:', data);
        resolve(data);
      }
    });
  });
};

module.exports = {
  send,
};
