const express = require('express');
const router = require('../routes/analyze.js').router;
const cluster = require('cluster');
const cpuCount = require('os').cpus().length;
const bodyParser = require('body-parser');

if (cluster.isMaster) {
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  const app = express();
  module.exports.app = app;
  const PORT = process.env.PORT || 3000;
  app.use(bodyParser.json());
  // set up routes
  app.use('/analyze', router);

  app.get('/', (req, res) => {
    const data = 'Hello! Welcome to the Pinteresting Analytics microservice. Now performing analysis...'
    res.send(data)
  });

  app.listen(PORT, (err) => {
    if (err) {
      console.log('cannot connect to server', err);
    } else {
      console.log(`listening on port ${PORT}`);
    }
  });
}
