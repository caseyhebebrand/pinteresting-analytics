const db = require('../database/index.js');
const Promise = require('bluebird');
const dashboard = require('../dashboard/index.js');
const analysis = require('../analysis/ratioRegression.js');
const sqsOutput = require('../workers/sendUserData.js');

const process = (message) => {
  console.log('in PROCESS:', typeof JSON.parse(message.Body))
}

module.exports = {
  process,
}