const db = require('../database/index.js');

const calculateRatio = (userId, currentScore) => {
  return db.getUserHistory(userId)
    .then((results) => {
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

      let sigmaX = x.reduce((accum, value) => {
        accum += value;
        return accum;
      });

      let sigmaY = y.reduce((accum, value) => {
        accum += value;
        return accum;
      });

      let sigmaXY = xy.reduce((accum, value) => {
        accum += value;
        return accum;
      });

      let sigmaX2 = x2.reduce((accum, value) => {
        accum += value;
        return accum;
      });

      let slope = ((length * sigmaXY) - (sigmaX * sigmaY)) / ((length * sigmaX2) - (sigmaX * sigmaX));
      let intercept = (sigmaY - (slope * sigmaX)) / length;
      let target = currentScore * 1.15;
      let ratio = Number(((slope * target) + intercept).toPrecision(3));
      
      return ratio;
    });
};

module.exports = {
  calculateRatio,
};