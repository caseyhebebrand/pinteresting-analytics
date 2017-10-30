const request = require('request-promise');

const sendMessage = (message) => {
  return new Promise ((resolve, reject) => {
    const options = {
      method: 'POST',
      url: 'http://127.0.0.1:3003/analytics',
      body: message,
      json: true,
    };
    request(options)
      .then((results) => {
        console.log('success sending data to ad aggregator', results);
        resolve(results);
      })
      .catch((err) =>{
        console.error('post to analytics module failed', err);
        reject(err);
      });
  })
};

module.exports = {
  sendMessage,
};

