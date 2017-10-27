const mysql = require('mysql');
const db = require('../analytics/database/index.js');
const Promise = require('bluebird');
const expect = require('chai').expect;

describe('Analytics relational database', () => {
  const cbMysql;
  
  beforeEach( (done) => {
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'analytics',
    })
    cbMysql.connect();
    const connection = Promise.promisifyAll(cbMysql);

    connection.query('truncate user_inputs', done);
    connection.query('truncate user_data', done);
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
        expect(results.length).to.equal(10);
        done();
      });
  });

  it('Should insert user data into the DB using the insertNewData function', (done) => {
    const params = [1, 0.18, 0.62, 1, 2, 3];
    db.insertNewData(params)
      .then( () => {
        const query = 'SELECT * from user_data where userId = 1 ORDER BY createdAt DESC LIMIT 1;'
        return connection.query(query);
      })
      .then((results) => {
        expect(results[0].userId).to.equal(1);
        expect(results[0].ratio).to.equal(0.18);
        expect(results[0].engagement).to.equal(0.62);
      });
  });

  it('Should retreive user\'s ratio and ad engagement history', (done) => {
    const params = [1, 0.18, 0.62, 1, 2, 3];
    db.insertNewData(params)
      .then(() => {
        const userId = 1;
        return db.getUserHistory(userId);
      })
      .then((results) => {
        expect(results).to.be.an('array');
        expect(results[0]).to.have.property('ratio');
        expect(results[0]).to.have.property('engagement');
      });
  });

  it('Should get a user\'s top 3 areas of interest for ads', (done) => {
    const id = 1;
    const params = [1, 0, 0, 2, 3, 1, 0, 4, 1, 1];
    db.insertAdClicks(id, params)
      .then( () => {
        return db.getTopAdInterests(id, params);
      })
      .then((results) => {
        expect(results.length).to.equal(3);
        expect(results[0].name).to.equal('entertainment');
        expect(results[1].name).to.equal('travel');
        expect(resutls[2].name).to.equal('sports');
      })
  });
});