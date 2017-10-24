const router = require('express').Router();

router.post('/', (req, res) => {
  console.log('in ANALYZE ROUTER', req.body);
})

module.exports = router;