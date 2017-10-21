const express = require('express');
const db = require('../database/index.js');

const app = express();
const port = 3000;

app.listen(port, (err) => {
  if (err) {
    console.log('cannot connect to server', err);
  } else {
    console.log(`listening on port ${port}`);
  }
});

