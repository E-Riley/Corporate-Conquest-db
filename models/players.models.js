const db = require("../db/connection");

exports.fetchPlayers = () => {
  let sqlQuery = `SELECT player_id, player_name, email, created_at
FROM players;`;

  return db.query(sqlQuery).then(({ rows }) => {
    return rows;
  });
};

exports.insertPlayer = (player_name, email, password) => {
  return db
    .query(
      "INSERT INTO players (player_name, email, password) VALUES ($1, $2, $3) RETURNING *;",
      [player_name, email, password]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
