const elasticsearch = require('elasticsearch');
// Uncomment for use locally
//const esAccess = require('../../config.js');

const client = new elasticsearch.Client({
  host: process.env.ES_HOST || esAccess.ES_HOST,
  log: 'trace',
});

client.ping({
  requestTimeout: 30000,
}, (error) => {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

const submitInputIndex = (userInputs) => {
  return new Promise((resolve, reject) => {
    client.index({
      index: 'analytics',
      type: 'inputs',
      body: userInputs,
    }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const visualizeUserData = (userData) => {
  return new Promise((resolve, reject) => {
    client.index({
      index: 'post-analysis',
      type: 'output',
      body: userData,
    }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  submitInputIndex,
  visualizeUserData,
};
