const express = require("express");
const apiRouter = require("./routes/api.router");

const cors = require('cors');
const passport = require('passport');
const dotenv = require('dotenv');
const playersRouter = require('./routes/players.router.js')

dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
require('./db/passport')(passport);

app.use('/', playersRouter)

app.use("/api", apiRouter);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502" || err.code === "23503") {
    return res.status(400).send({ msg: "Bad request" });
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  if (err.status && err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  }
  res.status(500).send({ msg: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

module.exports = app;
