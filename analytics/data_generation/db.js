const mysql = require('mysql');
const Promise = require('bluebird');
const dbAccess = require('../../config.js');

const cbMysql = mysql.createConnection({
  host: process.env.MYSQL_HOST || dbAccess.MYSQL_HOST,
  port: process.env.MYSQL_PORT || dbAccess.MYSQL_PORT,
  user: process.env.MYSQL_USERNAME || dbAccess.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD || dbAccess.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || dbAccess.MYSQL_DATABASE,
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

const insertAdClicks = (id, params) => {
  const query = `INSERT INTO user_inputs (usersId, categoryId, clicks) VALUES (${id}, 1, ?), (${id}, 2, ?), (${id}, 3, ?), (${id}, 4, ?), (${id}, 5, ?), (${id}, 6, ?), (${id}, 7, ?), (${id}, 8, ?), (${id}, 9, ?), (${id}, 10, ?);`;
  return connection.queryAsync(query, params)
    .then(data => data)
    .catch((err) => {
      console.error(err);
      return err;
    });
};

module.exports = {
  insertNewData,
  insertAdClicks,
};
