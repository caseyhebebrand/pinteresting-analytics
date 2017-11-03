const mysql = require('mysql');
const Promise = require('bluebird');

const cbMysql = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'analytics',
});

cbMysql.connect((err) => {
  if (err) {
    console.log('could not connect to database', err);
  } else {
    console.log('connected to database');
  }
});
const connection = Promise.promisifyAll(cbMysql);

const insertNewData = (params) => {
  const query = 'INSERT INTO user_data (userId, ratio, engagement, first, second, third) VALUES (?, ?, ?, ?, ?, ?);';
  return connection.queryAsync(query, params)
    .then(data => data)
    .catch((err) => {
      console.error(err);
      return err;
    });
};

module.exports = {
  insertNewData,
};
