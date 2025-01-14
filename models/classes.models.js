const db = require("../db/connection");

exports.selectClasses = () => {
  return db.query("SELECT * FROM classes;").then(({ rows }) => {
    return rows;
  });
};
