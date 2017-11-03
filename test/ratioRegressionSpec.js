const expect = require('chai').expect;
const analysis = require('../analytics/analysis/ratioRegression.js');

describe('Ratio caclulation linear regression algorithm', () => {
  it('Should return a ratio between 0.04 and 0.25', (done) => {
    analysis.calculateRatio(2, 0.48)
      .then((ratio) => {
        expect(ratio).to.be.within(0.04, 0.25);
        expect(ratio).to.be.a('number');
      })
  });
});