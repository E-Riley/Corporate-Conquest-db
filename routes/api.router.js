const express = require("express");
const playerRouter = require("./players.router");
const classesRouter = require("./classes.router");
const levelsRouter = require("./levels.router");
const leaderboardRouter = require("./leaderboard.router");
const { getEndpoints } = require("../controllers/api.controllers");

const apiRouter = express.Router();

apiRouter.get("/", getEndpoints);
apiRouter.use("/players", playerRouter);
apiRouter.use("/classes", classesRouter);
apiRouter.use("/levels", levelsRouter);
apiRouter.use("/leaderboard", leaderboardRouter);

module.exports = apiRouter;
