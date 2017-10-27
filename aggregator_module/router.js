const router = require('express').Router();

router.post('/', (req, res) => {
  console.log('in this AD AGGREGATOR', req.body);
  res.status(200).send();
});

module.exports = router;