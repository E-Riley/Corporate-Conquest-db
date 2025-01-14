const express = require("express");
const playerRouter = require("./players.router");
const classesRouter = require("./classes.router");
const levelsRouter = require("./levels.router");
const leaderboardRouter = require("./leaderboard.router");
const { getEndpoints } = require("../controllers/api.controllers");

const apiRouter = express.Router();

apiRouter.get("/", getEndpoints);
apiRouter.get("/players", playerRouter);
apiRouter.get("/classes", classesRouter);
apiRouter.get("/levels", levelsRouter);
apiRouter.get("/leaderboard", leaderboardRouter);

module.exports = apiRouter;
