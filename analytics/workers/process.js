const db = require('../database/index.js');
const dashboard = require('../dashboard/index.js');
const analysis = require('../analysis/ratioRegression.js');
const sqsOutput = require('../workers/sendUserData.js');
const queueUrl = require('../../config.js');

const process = (message) => {
  const inputs = JSON.parse(message);
  const userId = inputs.userId;
  const engagement = inputs.engagementScore;
  const outputs = {
    userId,
    interests: [],
  };
  const topCategories = [];
  let params = [];
  const keys = Object.keys(inputs.adClicks);
  keys.forEach((key) => {
    params.push(inputs.adClicks[key]);
  });

  db.insertAdClicks(userId, params)
    .then((data) => {
      if (!inputs.scoreDropped) {
        throw data;
      } else {
        return analysis.calculateRatio(userId, engagement);
      }
    })
    .then((ratio) => {
      outputs.ratio = ratio;
      outputs.numAds = Math.floor(32 * outputs.ratio);
      return db.getTopAdInterests(userId);
    })
    .then((interests) => {
      interests.forEach((interest) => {
        outputs.interests.push(interest.categoryId);
        topCategories.push(interest.categoryId);
      });
      params = {
        MessageBody: JSON.stringify(outputs),
        QueueUrl: process.env.SQS_OUTPUT_URL || queueUrl.OUTPUT_QUEUE_URL,
        DelaySeconds: 0,
      };
      return sqsOutput.sendMessage(params);
    })
    .then(() => dashboard.visualizeUserData(outputs))
    .then(() => {
      const param = [userId, outputs.ratio, engagement].concat(topCategories);
      return db.insertNewData(param);
    })
    .catch(err => console.error(err));
};

module.exports = {
  process,
};
