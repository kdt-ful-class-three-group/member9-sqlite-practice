const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/mydatabase.db');

// 테이블 생성 (없을 때만 생성)
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            nick TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone TEXT NOT NULL
                                         
            
                                        
        )
    `);
});







module.exports = db;