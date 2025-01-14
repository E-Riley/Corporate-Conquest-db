const { selectClasses } = require("../models/classes.models");

exports.getClasses = (req, res, next) => {
  selectClasses()
    .then((playerClasses) => {
      res.status(200).send({ playerClasses });
    })
    .catch(next);
};
