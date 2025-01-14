const data = require("./data/test-data");
const seed = require("./seed");

const db = require("./connection.js");

seed(data).then(() => db.end());
