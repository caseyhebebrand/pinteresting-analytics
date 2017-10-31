const aws = require('aws-sdk');

// load aws credentials
aws.config.loadFromPath(__dirname + '/config.json');

// Instantiate SQS 
const sqs = new aws.SQS();

const receive = (params) => {
  return new Promise ((resolve, reject) => {
    sqs.receiveMessage(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const delete = (params) => {
  return new Promise ((resolve, reject) =. {
    sqs.deleteMessage(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = {
  receive,
  delete,
};