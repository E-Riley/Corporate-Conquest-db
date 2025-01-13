const { formatData } = require("../utils/utils");
const db = require("./connection");
const format = require("pg-format");

const seed = ({ playerData, levelData, classData, leaderboardData }) => {
  return db
    .query(`DROP TABLE IF EXISTS leaderboard;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS players;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS levels;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS classes;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE players (
            player_id SERIAL PRIMARY KEY,
            player_name VARCHAR(100) NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE levels (
            level_id SERIAL PRIMARY KEY,
            level_name VARCHAR(100) NOT NULL UNIQUE,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE classes(
            class_id SERIAL PRIMARY KEY,
            class_name VARCHAR(100) NOT NULL UNIQUE,
            description TEXT
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE leaderboard (
            entry_id SERIAL PRIMARY KEY,
            player_id INT NOT NULL REFERENCES players(player_id),
            level_id INT NOT NULL REFERENCES levels(level_id),
            class_id INT NOT NULL REFERENCES classes(class_id),
            score INT NOT NULL,
            completion_time TIME NOT NULL,
            achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
    })
    .then(() => {
      const formatSql = format(
        `INSERT INTO players (player_name) VALUES %L RETURNING *;`,
        formatData(playerData)
      );
      return db.query(formatSql);
    })
    .then(() => {
      const formatSql = format(
        `INSERT INTO levels (level_name, description) VALUES %L;`,
        formatData(levelData)
      );
      return db.query(formatSql);
    })
    .then(() => {
      const formatSql = format(
        `INSERT INTO classes (class_name, description) VALUES %L;`,
        formatData(classData)
      );
      return db.query(formatSql);
    })
    .then(() => {
      const formatSql = format(
        `INSERT INTO leaderboard (player_id, level_id, class_id, score, completion_time) VALUES %L;`,
        formatData(leaderboardData)
      );
      return db.query(formatSql);
    });
};

module.exports = seed;
