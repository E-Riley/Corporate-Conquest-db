const db = require("../db/connection");

exports.selectLevels = () => {
  return db.query(`SELECT * FROM levels;`).then(({ rows }) => {
    return rows;
  });
};
