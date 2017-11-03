const express = require('express');
const cluster = require('cluster');
const cpuCount = require('os').cpus().length;
const generate = require('./dataGen');
const db = require('./db.js');

if (cluster.isMaster) {
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  const app = express();
  const PORT = 3030;

  const getData = () => {
    const data = generate.generateData();
    let params = [data.userId, data.ratio, data.engagement, data.interests[0], data.interests[1], data.interests[2]];
    db.insertNewData(params)
      .then(() => {
        const inputs = generate.userLogOut();
        const keys = Object.keys(inputs.adClicks);
        params = [];
        keys.forEach((key) => {
          params.push(inputs.adClicks[key]);
        });

        return db.insertAdClicks(inputs.userId, params);
      })
      .then((results) => {
        console.log(results);
      });
  };

  setInterval(getData, 20);

  app.listen(PORT, (err) => {
    if (err) {
      console.log('cannot connect to server', err);
    } else {
      console.log(`listening on port ${PORT}`);
    }
  });
}