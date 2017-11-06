const AWS = require('aws-sdk');
// Uncomment for use locally:
// const config = require('../../config.js');

// load aws credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_AD || config.AWS_ACCESS_KEY_ID_AD,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_AD || config.AWS_SECRET_ACCESS_KEY_AD,
  region: process.env.AWS_SQS_REGION || config.AWS_SQS_REGION,
});

// Instantiate SQS
const sqs = new AWS.SQS();
const sendMessage = (params) => {
  return new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) {
        console.log('error sending message to ads', err);
        reject(err);
      } else {
        console.log('success sending message to ads', data);
        resolve(data);
      }
    });
  });
};

module.exports = {
  sendMessage,
};

