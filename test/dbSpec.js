const mysql = require('mysql');
const db = require('../analytics/database/index.js');
const expect = require('chai').expect;

describe('Analytics relational database', () => {
  const connection;
  
  beforeEach( (done) => {
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'analytics',
    })
    connection.connect();

    connection.query('truncate user_inputs', done);
  });

  afterEach( () => {
    connection.end();
  });

  it('Should insert user ad clicks into the DB using the insertAdClicks function', (done) => {
    const id = 1;
    const params = [1, 0, 0, 2, 3, 1, 0, 0, 2, 1];
    db.insertAdClicks(id, params)
      .then( () => {
        const query = 'SELECT * FROM user_inputs WHERE usersId = 1';
        return connection.query(query);
      })
      .then( (results) => {
        expect(results.rows.length).to.equal(10);
        done();
      });
  });
});