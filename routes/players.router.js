const express = require("express");
const { getPlayers, postPlayer } = require("../controllers/players.controller");
const playersRouter = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const db = require("../db/connection");
const secret = process.env.JWT_SECRET;

require('dotenv').config();

playersRouter.get("/", getPlayers);
playersRouter.post("/", postPlayer);

// Player registration
playersRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const userExists = await db.query('SELECT * FROM players WHERE player_name = $1', [username]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query('INSERT INTO players (player_name, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
      res.status(201).json({ message: 'User created' });
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Server error' });
    }
});

// Player login
playersRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await db.query('SELECT * FROM players WHERE player_name = $1', [username]);
      if (user.rows.length === 0) {
        return res.status(400).json({ message: 'Incorrect login or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.rows[0].password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect login or password' });
      }
  
      const payload = { id: user.rows[0].id, username: user.rows[0].username };
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  
      res.json({ message: 'Successful login', token: `Bearer ${token}` });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
});
  
// Player exit
playersRouter.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
});
  
// Protected profile route
playersRouter.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user });
});


module.exports = playersRouter;
