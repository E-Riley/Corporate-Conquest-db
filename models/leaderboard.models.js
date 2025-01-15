const db = require("../db/connection");

exports.selectLeaderboard = (level_id) => {
  let sqlQuery = `SELECT leaderboard.*, players.player_name, levels.level_name, classes.class_name
    FROM leaderboard
    JOIN players ON leaderboard.player_id = players.player_id
    JOIN levels ON leaderboard.level_id = levels.level_id
    JOIN classes ON leaderboard.class_id = classes.class_id`;

  const params = [];
  if (level_id) {
    params.push(level_id);
    sqlQuery += ` WHERE leaderboard.level_id = $1`;
  }

  sqlQuery += ` ORDER BY score DESC;`;
  return db.query(sqlQuery, params).then(({ rows }) => {
    return rows;
  });
};

exports.insertLeaderboardEntry = (
  player_id,
  level_id,
  class_id,
  score,
  completion_time
) => {
  return db
    .query(
      `INSERT INTO leaderboard (player_id, level_id, class_id, score, completion_time)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [player_id, level_id, class_id, score, completion_time]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
