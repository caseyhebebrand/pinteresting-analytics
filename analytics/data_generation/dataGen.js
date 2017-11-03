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

const generateData = () => new UserAnalysis();

module.exports = {
  generateData,
};
