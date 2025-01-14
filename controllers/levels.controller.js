const { selectLevels } = require("../models/levels.models");

exports.getLevels = (req, res, next) => {
  console.log("in controller");
  selectLevels()
    .then((levels) => {
      res.status(200).send({ levels });
    })
    .catch(next);
};
