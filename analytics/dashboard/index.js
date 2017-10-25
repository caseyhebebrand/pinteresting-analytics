const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200',
});

const submitInputIndex = (userInputs) => {
  console.log('in the dashboard function!!')
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
  })
}

module.exports = {
  submitInputIndex,
}