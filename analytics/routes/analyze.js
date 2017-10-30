const router = require('express').Router();
const db = require('../database/index.js');
const Promise = require('bluebird');
const dashboard = require('../dashboard/index.js');
const analysis = require('../analysis/ratioRegression.js');
const workers = require('../workers/sendUserData.js');


router.post('/', (req, res) => {
  const inputs = req.body;
  const userId = inputs.userId;
  const engagement = inputs.engagementScore;
  const params = [];
  const outputs = {
    userId: userId,
    interests: [],
  };
  for (const key in inputs.adClicks) {
    params.push(inputs.adClicks[key]);
  }

  res.send();

  db.insertAdClicks(userId, params)
    .then((data) => {
      if (!inputs.scoreDropped) {
        throw data;
      } else {
        return analysis.calculateRatio(userId, engagement);
      }
    })
    .then((ratio) => {
      console.log('RATIO', ratio)
      outputs.ratio = ratio;
      outputs.numAds = Math.floor(32 * outputs.ratio);
      return db.getTopAdInterests(userId);
    })
    .then((interests) => {
      const param = [userId, outputs.ratio, engagement];
      interests.forEach((interest) => {
        outputs.interests.push(interest.name);
        param.push(interest.categoryId);
      });
      return db.insertNewData(param);
    })
    .then(() => {
      return workers.sendMessage(outputs);
     
    })
    .then(() => {
      return dashboard.visualizeUserData(outputs);
    })
    .then(() => {
      console.log('DONE WITH THE DASHBOARD')
    })
    .catch((error) => {
      console.log(error);
    })
});

module.exports = router;
