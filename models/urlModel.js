const db = require('./db');

const createUrl = (originalUrl, shortId) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO urls (originalUrl, shortId, clicks, lastAccessed) VALUES (?, ?, 0, NULL)`;
    db.run(query, [originalUrl, shortId], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
};

const findUrlByShortId = (shortId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM urls WHERE shortId = ?`;
    db.get(query, [shortId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const incrementClick = (shortId) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE urls SET clicks = clicks + 1, lastAccessed = datetime('now') WHERE shortId = ?`;
    db.run(query, [shortId], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
};

const getUrlStats = (shortId) => {
  return findUrlByShortId(shortId);
};

module.exports = { createUrl, findUrlByShortId, incrementClick, getUrlStats };
