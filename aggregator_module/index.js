const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const cluster = require('cluster');
const cpuCount = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    cluster.fork();
  });
} else {
  const app = express();
  module.exports.app = app;
  const PORT = 3003;
  
  app.use(bodyParser.json());
  app.use('/analytics', router);
  
  app.listen(PORT, (err) => {
    if (err) {
      console.log('cannot connect to server', err);
    } else {
      console.log(`ad aggregator module listening on port ${PORT}`);
    };
  });
}
