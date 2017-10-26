const db = require('../database/index.js');

const calculateRatio = (userId, currentScore) => {
  db.getUserHistory(userId)
    .then(results => {
      console.log('ratio regression results', results);
    })
};

module.exports = {
  calculateRatio,
}