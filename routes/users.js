const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/data/user', (req, res) => {
  db.insertUserData(req.query.id, req.query.name, req.query.address);
})

router.post('/data/user', (req, res) => {
  console.log('in post router');
})

module.exports = router;