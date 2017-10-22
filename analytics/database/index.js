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
