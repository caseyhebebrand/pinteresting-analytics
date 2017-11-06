const AWS = require('aws-sdk');
const config = require('../config.js');

// load aws credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_AD || config.AWS_ACCESS_KEY_ID_AD,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_AD || config.AWS_SECRET_ACCESS_KEY_AD,
  region: process.env.AWS_SQS_REGION || config.AWS_SQS_REGION,
});

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
