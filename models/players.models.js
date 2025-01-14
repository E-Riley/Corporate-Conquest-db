const db = require("../db/connection");

exports.fetchPlayers = () => {
  let sqlQuery = `SELECT * FROM players`;

  return db.query(sqlQuery).then(({ rows }) => {
    return rows;
  });
};
