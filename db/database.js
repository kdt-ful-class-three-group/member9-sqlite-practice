const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./table/user.db');

db.run(`
    CREATE TABLE IF NOT EXISTS USER (
      id INTEGER,
      name TEXT,
      address TEXT
    )
`);

module.exports = db;