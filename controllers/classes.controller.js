const { selectClasses } = require("../models/classes.models");

exports.getClasses = (req, res, next) => {
  selectClasses()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};
