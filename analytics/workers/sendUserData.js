const request = require('request-promise');
const aws = require('aws-sdk');

// load aws credentials
aws.config.loadFromPath(__dirname + '/config.json');
// Instantiate SQS 
const sqs = new aws.SQS();

// const sendMessage = (message) => {
//   return new Promise ((resolve, reject) => {
//     const options = {
//       method: 'POST',
//       url: 'http://127.0.0.1:3003/analytics',
//       body: message,
//       json: true,
//     };
//     request(options)
//       .then((results) => {
//       console.log('success sending data to ad aggregator', results);
//         resolve(results);
//       })
//       .catch((err) =>{
//         console.error('post to analytics module failed', err);
//         reject(err);
//       });
//   })
// };

const sendMessage = (params) => {
  return new Promise((resolve, reject) => {
    sqs.sendMessage(params, (err, data) => {
      if (err) {
        console.log('error sending message to ads', err);
        reject(err);
      } else {
        console.log('success sending message to ads', data)
        resolve(data);
      }
    });
  });
};

module.exports = {
  sendMessage,
};

