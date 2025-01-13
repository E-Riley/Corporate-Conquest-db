const data = require("./data/test-data");
const seed = require("./seed");

const db = require("./connection.js");
console.log(data);

seed(data).then(() => db.end());
