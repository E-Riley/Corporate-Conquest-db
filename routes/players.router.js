const express = require("express");
const { getPlayers, postPlayer } = require("../controllers/players.controller");
const playersRouter = express.Router();

playersRouter.get("/", getPlayers);
playersRouter.post("/", postPlayer);
