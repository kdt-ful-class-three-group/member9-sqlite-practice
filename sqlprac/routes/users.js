const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET 경로 지정
router.get('/', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
})



// POST  경로 /api/users
router.post('/', (req, res) => {
    const { email, nick, password, phone } = req.body;
    if (!email || !nick || !password || !phone) {
        return res.status(400).json({ error: 'All fields required' });
    }

    db.run(
        'INSERT INTO users (email, nick, password,  phone) VALUES (?, ?, ?, ?)',
        [email, nick, password, phone],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );



});

module.exports = router;