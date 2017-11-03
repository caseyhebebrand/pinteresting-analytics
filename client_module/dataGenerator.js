// generate input data from client module

class UserStats {
  constructor() {
    this.userId = Math.floor((Math.random()) * 100);
    this.adClicks = {};
    this.engagementScore = Number(Math.random().toFixed(4));
    this.scoreDropped = Math.random();
    this.adClicks.food = Math.floor(Math.random() * 10);
    this.adClicks.fashion = Math.floor(Math.random() * 10);
    this.adClicks.products = Math.floor(Math.random() * 10);
    this.adClicks.sports = Math.floor(Math.random() * 10);
    this.adClicks.travel = Math.floor(Math.random() * 10);
    this.adClicks.events = Math.floor(Math.random() * 10);
    this.adClicks.design = Math.floor(Math.random() * 10);
    this.adClicks.entertainment = Math.floor(Math.random() * 10);
    this.adClicks.crafts = Math.floor(Math.random() * 10);
    this.adClicks.photography = Math.floor(Math.random() * 10);
  }
}

const userLogOut = () => new UserStats();

module.exports = {
  userLogOut,
};
