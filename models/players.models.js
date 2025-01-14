const db = require("../db/connection");

exports.fetchPlayers = () => {
  let sqlQuery = `SELECT * FROM players`;

  return db.query(sqlQuery).then(({ rows }) => {
    return rows;
  });
};

exports.insertPlayer = (player_name) => {
  return db
    .query("INSERT INTO players (player_name) VALUES ($1) RETURNING *;", [
      player_name,
    ])
    .then(({ rows }) => {
      return rows[0];
    });
};
