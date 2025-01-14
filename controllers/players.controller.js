const { fetchPlayers } = require("../models/players.models");

exports.getPlayers = (req, res, next) => {
  fetchPlayers().then((rows) => {
    res.status(200).send({ players: rows });
  });
};
