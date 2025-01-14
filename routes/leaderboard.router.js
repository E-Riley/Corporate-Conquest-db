const express = require("express");
const {
  getLeaderboard,
  postLeaderboardEntry,
} = require("../controllers/leaderboard.controllers");
const leaderboardRouter = express.Router();

leaderboardRouter.get("/", getLeaderboard);
leaderboardRouter.post("/", postLeaderboardEntry);

module.exports = leaderboardRouter;
