const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('in this AD AGGREGATOR', req.body);
  res.status(200).send();
});

module.exports = router;