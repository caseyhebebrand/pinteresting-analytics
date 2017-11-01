const router = require('express').Router();
const db = require('../database/index.js');
const Promise = require('bluebird');
const dashboard = require('../dashboard/index.js');
const analysis = require('../analysis/ratioRegression.js');
const sqsOutput = require('../workers/sendUserData.js');
const sqsInput = require('../workers/getClientInput.js');
const queueUrl = require('../../config.js');

const processData = () => {
  let inputs;
  let userId;
  let engagement;
  let outputs = {
    interests: [],
  };
  let topCategories = [];
  let params = {
    QueueUrl: queueUrl.INPUT_QUEUE_URL,
    VisibilityTimeout: 300,
  };
  sqsInput.receiveSQS(params)
    .then((data) => {
      inputs = JSON.parse(data.Messages[0].Body);
      userId = inputs.userId;
      outputs.userId = userId;
      engagement = inputs.engagementScore;
      params = {
        QueueUrl: queueUrl.INPUT_QUEUE_URL,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };
      return sqsInput.deleteSQS(params);
    })
    .then(() => {
      params = [];
      for (const key in inputs.adClicks) {
        params.push(inputs.adClicks[key]);
      }
      return db.insertAdClicks(userId, params)
    })
    .then((data) => {
      if (!inputs.scoreDropped) {
        throw data;
      } else {
        return analysis.calculateRatio(userId, engagement);
      }
    })
    .then((ratio) => {
      console.log('ABOUT TO GET INTERESTS')
      outputs.ratio = ratio;
      outputs.numAds = Math.floor(32 * outputs.ratio);
      return db.getTopAdInterests(userId);
    })
    .then((interests) => {
      console.log('GOT INTERESTS')
      interests.forEach((interest) => {
        outputs.interests.push(interest.name);
        topCategories.push(interest.categoryId);
      });
      params = {
        MessageBody: JSON.stringify(outputs),
        QueueUrl: queueUrl.OUTPUT_QUEUE_URL,
        DelaySeconds: 0,
      };
      return sqsOutput.sendMessage(params);
    })
    .then(() => {
      return dashboard.visualizeUserData(outputs);
    })
    .then(() => {
      const param = [userId, outputs.ratio, engagement].concat(topCategories);
      return db.insertNewData(param);
    })
    .catch((err) => {
      // catch unhandled data from scoreDropped = false
    });  
}

setInterval(processData, 2000);

module.exports = router;
