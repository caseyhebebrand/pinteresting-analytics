const mysql = require('mysql');
const Promise = require('bluebird');

const cbMysql = mysql.createConnection({
  host: 'localhost',
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
  const query = 'INSERT INTO user_data (userId, ratio, engagement, first, second,   third) VALUES (?, ?, ?, (SELECT id FROM interests WHERE name = ?), (SELECT    id FROM interests WHERE name = ?), (SELECT id FROM interests WHERE name = ?)  );';
  return connection.queryAsync(query, params)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

const insertAdClicks = (id, params) => {
  const query = `INSERT INTO user_inputs (usersId, categoryId, clicks) VALUES (${id}, 1, ?), (${id}, 2, ?), (${id}, 3, ?), (${id}, 4, ?), (${id}, 5, ?), (${id}, 6, ?), (${id}, 7, ?), (${id}, 8, ?), (${id}, 9, ?), (${id}, 10, ?);`;
  return connection.queryAsync(query, params)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

const getUserHistory = (userId) => {
  console.log('getting user history')
  const query = 'SELECT ratio, engagement FROM user_data WHERE userId = ?;';
  return connection.queryAsync(query, [userId])
    .then((data) => {
      console.log('in here with data', data)
      return data;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

const getTopAdInterests = (userId) => {
  const query = 'SELECT i.name, u.categoryId, SUM(u.clicks) AS totalClicks FROM user_inputs AS u JOIN interests AS i ON i.id = u.categoryId WHERE u.usersId = ? GROUP BY i.name, u.categoryId ORDER BY totalClicks DESC LIMIT 3;';
  return connection.queryAsync(query, [userId])
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

module.exports = {
  insertNewData,
  insertAdClicks,
  getUserHistory,
  getTopAdInterests,
};
