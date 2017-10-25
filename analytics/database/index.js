const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'analytics',
});

connection.connect((err) => {
  if (err) {
    console.log('could not connect to database', err);
  } else {
    console.log('connected to database');
  }
});

const insertNewData = (params, callback) => {
  const query = 'INSERT INTO user_data (userId, ratio, engagement, first, second,   third) VALUES (?, ?, ?, (SELECT id FROM interests WHERE name = ?), (SELECT    id FROM interests WHERE name = ?), (SELECT id FROM interests WHERE name = ?)  );';
  connection.query(query, params, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const insertAdClicks = (id, params) => {
  const query = `INSERT INTO user_inputs (usersId, categoryId, clicks) VALUES (${id}, 1, ?), (${id}, 2, ?), (${id}, 3, ?), (${id}, 4, ?), (${id}, 5, ?), (${id}, 6, ?), (${id}, 7, ?), (${id}, 8, ?), (${id}, 9, ?), (${id}, 10, ?);`;
  connection.query(query, params, (err, result) => {
    if (err) {
      console.log('error inserting into db', err);
    } else {
      console.log('success inserting into db', result);
    }
  });
};

const getRatioHistory = (userId, callback) => {
  const query = 'SELECT ratio FROM user_data WHERE userId = ?;';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getEnagementHistory = (userId, callback) => {
  const query = 'SELECT engagement FROM user_data WHERE userId = ?;';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getClickHistory = (userId, callback) => {
  const query = 'SELCT i.name, u.categoryId, u.clicks FROM user_inputs AS u INNER JOIN interests AS i ON u.categoryId = i.id WHERE u.usersId = ?;';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  insertNewData,
  insertAdClicks,
  getRatioHistory,
  getEnagementHistory,
  getClickHistory,
};
