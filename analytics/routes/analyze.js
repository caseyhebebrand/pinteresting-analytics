const router = require('express').Router();
const db = require('../database/index.js');
const Promise = require('bluebird');
const dashboard = require('../dashboard/index.js');
const analysis = require('../analysis/ratioRegression.js');
const sqsOutput = require('../workers/sendUserData.js');
const sqsInput = require('../workers/getClientInput.js');
const queueUrl = require('../../config.js');
const consumer = require('../workers/getClientInput.js').consumer;

// start SQS polling
consumer.start();

consumer.on('error', (err) => {
  console.log(err.message);
});

// const processData = () => {
//   let inputs;
//   let userId;
//   let engagement;
//   let outputs = {
//     interests: [],
//   };
//   let topCategories = [];
//   let params = {
//     QueueUrl: queueUrl.INPUT_QUEUE_URL,
//     VisibilityTimeout: 300,
//   };
//   sqsInput.receiveSQS(params)
//     .then((data) => {
//       if (data.Messages && data.Messages.length > 0) {
//         inputs = JSON.parse(data.Messages[0].Body);
//         userId = inputs.userId;
//         outputs.userId = userId;
//         engagement = inputs.engagementScore;
//         params = {
//           QueueUrl: queueUrl.INPUT_QUEUE_URL,
//           ReceiptHandle: data.Messages[0].ReceiptHandle,
//         };
//         return sqsInput.deleteSQS(params);
//       } else {
//         throw data;
//       }
//     })
//     .then(() => {
//       params = [];
//       for (const key in inputs.adClicks) {
//         params.push(inputs.adClicks[key]);
//       }
//       return db.insertAdClicks(userId, params)
//     })
//     .then((data) => {
//       if (!inputs.scoreDropped) {
//         throw data;
//       } else {
//         return analysis.calculateRatio(userId, engagement);
//       }
//     })
//     .then((ratio) => {
//       outputs.ratio = ratio;
//       outputs.numAds = Math.floor(32 * outputs.ratio);
//       return db.getTopAdInterests(userId);
//     })
//     .then((interests) => {
//       interests.forEach((interest) => {
//         outputs.interests.push(interest.categoryId);
//         topCategories.push(interest.categoryId);
//       });
//       console.log(outputs.interests)
//       params = {
//         MessageBody: JSON.stringify(outputs),
//         QueueUrl: queueUrl.OUTPUT_QUEUE_URL,
//         DelaySeconds: 0,
//       };
//       return sqsOutput.sendMessage(params);
//     })
//     .then(() => {
//       return dashboard.visualizeUserData(outputs);
//     })
//     .then(() => {
//       const param = [userId, outputs.ratio, engagement].concat(topCategories);
//       return db.insertNewData(param);
//     })
//     .catch((err) => {
//       // catch unhandled data from scoreDropped = false
//     });  
// }

// setInterval(processData, 100);

module.exports = {
  router,
};
