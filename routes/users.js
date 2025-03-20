const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/data/user', (req, res) => {
  console.log(req.query.id);
  console.log(req.query.name);
  console.log(req.query.address);
})

module.exports = router;