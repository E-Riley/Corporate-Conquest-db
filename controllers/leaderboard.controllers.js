const {
  selectLeaderboard,
  insertLeaderboardEntry,
} = require("../models/leaderboard.models");

exports.getLeaderboard = (req, res, next) => {
  const { level_id } = req.query;
  selectLeaderboard(level_id)
    .then((entries) => {
      res.status(200).send(entries);
    })
    .catch(next);
};

exports.postLeaderboardEntry = (req, res, next) => {
  const { player_id, level_id, class_id, score, completion_time } = req.body;
  insertLeaderboardEntry(player_id, level_id, class_id, score, completion_time)
    .then((entry) => {
      res.status(201).send(entry);
    })
    .catch(next);
};
