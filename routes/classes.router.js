const express = require("express");
const { getClasses } = require("../controllers/classes.controller");
const classesRouter = express.Router();

classesRouter.get("/", getClasses);

module.exports = classesRouter;
