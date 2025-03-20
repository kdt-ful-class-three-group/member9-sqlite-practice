import sqlite3 from "sqlite3";

const db = new sqlite3.Database('./banpick.db', (err) => {
  if (err) {
    console.log('db error');
    return;
  }
  console.log('db생성')
});
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS ban(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team TEXT NOT NULL,
    type TEXT NOT NULL,
    champion_name TEXT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
    db.run(`
    CREATE TABLE IF NOT EXISTS pick(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team TEXT NOT NULL,
    type TEXT NOT NULL,
    champion_name TEXT NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
})

export { db };