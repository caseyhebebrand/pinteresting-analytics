const getInterests = () => {
  const interests = [];
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let n = 10;
  while (interests.length < 3) {
    const index = Math.floor(Math.random() * n);
    interests.push(arr[index]);
    arr.splice(index, 1);
    n--;
  }
  return interests;
};

class UserAnalysis {
  constructor() {
    this.userId = Math.floor((Math.random()) * 100000);
    this.ratio =  Number((Math.random() * (0.25 - 0.04) + 0.04).toFixed(4));
    this.numAds = Math.floor(this.ratio * 32);
    this.engagement = Number((Math.random()).toFixed(4));
    this.interests = getInterests();
  };
}

class UserStats {
  constructor() {
    this.userId = Math.floor((Math.random()) * 100000);
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

const generateData = () => new UserAnalysis();
const userLogOut = () => new UserStats();

module.exports = {
  generateData,
  userLogOut,
};
