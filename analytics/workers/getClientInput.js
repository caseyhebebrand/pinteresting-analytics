const AWS = require('aws-sdk');
const Consumer = require('sqs-consumer');
const queueUrl = require('../../config.js').INPUT_QUEUE_URL;
const processData = require('./process.js').process;

// load aws credentials
AWS.config.loadFromPath(__dirname + '/config.json');

const consumer = Consumer.create({
  queueUrl,
  waitTimeSeconds: 10,
  handleMessage: (message, done) => {
    processData(message.Body);
    done();
  },
  sqs: new AWS.SQS(),
});


// Instantiate SQS
// const sqs = new aws.SQS();
// const receiveSQS = (params) => {
//   return new Promise((resolve, reject) => {
//     sqs.receiveMessage(params, (err, data) => {
//       if (err) {
//         //console.log('error receiving')
//         reject(err);
//       } else {
//         //console.log('success receiving')
//         resolve(data);
//       }
//     });
//   });
// };
// const deleteSQS = (params) => {
//   return new Promise((resolve, reject) => {
//     sqs.deleteMessage(params, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// module.exports = {
//   receiveSQS,
//   deleteSQS,
// };

module.exports = {
  consumer,
};