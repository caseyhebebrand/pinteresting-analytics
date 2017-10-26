const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../analytics/server/index.js');
const data = require('../client_module/dataGenerator.js');

const should = chai.should();
chai.use(chaiHttp);

describe('POST to /analyze', () => {
  it('it should POST an object conatining user bahvior data', (done) => {
    const userInfo = data.userLogOut();
    chai.request(server)
      .post('/analyze')
      .send(userInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
