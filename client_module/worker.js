const aws = require('aws-sdk');

// load aws credentials
aws.config.loadFromPath(__dirname + '/config.json');


// Instantiate SQS 
const sqs = new aws.SQS();

const send = (params) => {
  return new Promise ((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) {
        console.log('error sending message to SQS:', err);
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