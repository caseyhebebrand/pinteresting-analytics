const db = require('../database/index.js');

const calculateRatio = (userId, currentScore) => {
  return db.getUserHistory(userId)
    .then((results) => {
      if (results.length < 2) {
        throw results;
      }
      const x = [];
      const y = [];
      const xy = [];
      const x2 = [];
      const length = results.length;
      results.forEach((result) => {
        x.push(result.engagement);
        y.push(result.ratio);
        xy.push(result.engagement * result.ratio);
        x2.push(result.engagement * result.engagement);
      });

      const sigmaX = x.reduce((accum, value) => {
        accum += value;
        return accum;
      });

      const sigmaY = y.reduce((accum, value) => {
        accum += value;
        return accum;
      });

      const sigmaXY = xy.reduce((accum, value) => {
        accum += value;
        return accum;
      });

      const sigmaX2 = x2.reduce((accum, value) => {
        accum += value;
        return accum;
      });
      const slope = ((length * sigmaXY) - (sigmaX * sigmaY)) / ((length * sigmaX2) - (sigmaX * sigmaX));
      const intercept = (sigmaY - (slope * sigmaX)) / length;
      const target = currentScore * 1.15;
      let ratio = Number(((slope * target) + intercept).toPrecision(3));
      if (ratio < 0.04) {
        ratio = 0.04;
      } else if (ratio > 0.25) {
        ratio = 0.25;
      }
      return ratio;
    })
    .catch((results) => {
      if (results.length === 0) {
        return 0.15;
      } else if (results.length === 1) {
        return 0.18;
      }
    });
};

module.exports = {
  calculateRatio,
};
