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
  client.index({
    index: 'analytics',
    type: 'inputs',
    body: userInputs,
  }, (err, result) => {
    if (err) {
      console.error('Elasticsearch insertion error', err);
    } else {
      console.log('SUCCESS inserting into elastic search', result);
    }
  });
};

const visualizeUserData = (userData) => {
  client.index({
    index: 'post-analysis',
    type: 'output',
    body: userData,
  }, (err, result) => {
    if (err) {
      console.error('Elasticsearch insertion error', err);
    } else {
      console.log('SUCCESS inserting into elastic search', result);
    }
  });
};

module.exports = {
  submitInputIndex,
  visualizeUserData,
};
