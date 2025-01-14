const { fetchPlayers, insertPlayer } = require("../models/players.models");

exports.getPlayers = (req, res, next) => {
  fetchPlayers()
    .then((players) => {
      res.status(200).send({ players });
    })
    .catch(next);
};

exports.postPlayer = (req, res, next) => {
  const {
    body: { player_name },
  } = req;

  insertPlayer(player_name)
    .then((player) => {
      res.status(201).send({ player });
    })
    .catch(next);
};
