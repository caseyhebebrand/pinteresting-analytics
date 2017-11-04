const router = require('express').Router();
const consumer = require('./worker').consumer;

consumer.start();

consumer.on('error', (err) => {
  console.error(err.message);
});

module.exports = router;
