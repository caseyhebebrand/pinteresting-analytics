const express = require('express');
const db = require('../database/index.js');
const router = require('../routes/analyze.js');

const bodyParser = require('body-parser');
app.user(bodyParser.json());

const app = express();
module.exports.app = app;
const PORT = 3000;

// set up routes
app.use('/analyze', router);

app.listen(PORT, (err) => {
  if (err) {
    console.log('cannot connect to server', err);
  } else {
    console.log(`listening on port ${PORT}`);
  }
});

