const sqlite3 = require('sqlite3').verbose();
const { DATABASE_URL } = process.env;


const db = new sqlite3.Database(DATABASE_URL, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      originalUrl TEXT NOT NULL,
      shortId TEXT NOT NULL UNIQUE,
      clicks INTEGER DEFAULT 0,
      lastAccessed TEXT
    )
  `);
});

module.exports = db;
