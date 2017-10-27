const db = require('../database/index.js');

const calculateRatio = (userId, currentScore) => {
  return db.getUserHistory(userId)
    .then((results) => {
      if (results.length === 0) {
        throw 
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
      const ratio = Number(((slope * target) + intercept).toPrecision(3));
      return ratio;
    })
    .catch(() => {
      return 0.15;
    })
};

module.exports = {
  calculateRatio,
};
