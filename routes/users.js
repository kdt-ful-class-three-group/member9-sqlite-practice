const express = require('express');
const qs = require('querystring');
const router = express.Router();
const db = require('../db/database');

router.get('/data/user', (req, res) => {
  db.insertUserData(req.query.id, req.query.name, req.query.address);
})

router.post('/data/user', (req, res) => {
  req.on('data', (data) => {
    const user = qs.parse(data.toString());
    db.insertUserData(user.id, user.name, user.address);
  })
  res.redirect('/');
})

module.exports = router;