const AWS = require('aws-sdk');
const awsAccess = require('../../config.json');

// load aws credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || awsAccess.accessKeyId,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || awsAccess.secretAccessKey,
  region: process.env.AWS_SQS_REGION || awsAccess.region,
});
// AWS.config.loadFromPath(__dirname + '/config.json');

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

