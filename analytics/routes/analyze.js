const router = require('express').Router();
const db = require('../database/index.js');
const Promise = require('bluebird');
const dashboard = require('../dashboard/index.js');
const analysis = require('../analysis/ratioRegression.js');

router.post('/', (req, res) => {
  console.log('in ANALYZE ROUTER', req.body, req.body.adClicks);
  const inputs = req.body;
  const params = [];
  for (var key in inputs.adClicks) {
    params.push(inputs.adClicks[key]);
  }
  dashboard.submitInputIndex(inputs);
  db.insertAdClicks(inputs.userId, params);
  analysis.calculateRatio(inputs.userId, inputs.engagementScore)
    .then((ratio) => {
      console.log('ratio', ratio);
    });
 
  
});

module.exports = router;