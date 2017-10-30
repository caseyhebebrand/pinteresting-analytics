const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'localhost:9200',
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
  return new Promise ((resolve, reject) => {
    client.index({
      index: 'analytics',
      type: 'inputs',
      body: userInputs,
    }, (err, result) => {
      if (err) {
        console.error('Elasticsearch insertion error', err);
        reject(err);
      } else {
        console.log('SUCCESS inserting into elastic search', result);
        resolve(result);
      }
    });
  })
};

const visualizeUserData = (userData) => {
  return new Promise ((resolve, reject) => {
    client.index({
      index: 'post-analysis',
      type: 'output',
      body: userData,
    }, (err, result) => {
      if (err) {
        console.error('Elasticsearch insertion error', err);
        reject(err);
      } else {
        console.log('SUCCESS inserting into elastic search', result);
        resolve(result);
      }
    });
  })
};

module.exports = {
  submitInputIndex,
  visualizeUserData,
};
