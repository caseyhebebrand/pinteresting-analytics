const router = require('express').Router();
const consumer = require('../workers/getClientInput.js').consumer;

// start SQS polling
consumer.start();

consumer.on('error', (err) => {
  console.error(err.message);
});

module.exports = {
  router,
};
