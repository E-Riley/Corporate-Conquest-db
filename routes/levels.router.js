const express = require("express");
const { getLevels } = require("../controllers/levels.controller");
const levelsRouter = express.Router();

levelsRouter.get("/", getLevels);

module.exports = levelsRouter;
