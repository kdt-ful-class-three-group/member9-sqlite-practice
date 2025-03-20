const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./table/user.db');

db.run(`
    CREATE TABLE IF NOT EXISTS USER (
      id INTEGER,
      name TEXT,
      address TEXT
    )
`);

function insertUserData(id, userName, userAddress) {
  const sql =  `
    INSERT INTO USER(id, name, address) VALUES(?, ?, ?)
  `
  const insert = db.prepare(sql);
  
  insert.run(id, userName, userAddress);
}


module.exports = {
  db,
  insertUserData
};