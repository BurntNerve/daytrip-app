const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config.js');

const createAuthToken = user => {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('basic', { session: false, failWithError: true }),
  function(req, res) {
    const authToken = createAuthToken(req.user.apiRepr());
    res.json({ authToken });
  },
  function(err, req, res, next) {
    if (req.xhr) {
      return res.json(err);
    }
  }
);

router.post(
  '/refresh',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const authToken = createAuthToken(req.user);
    res.json({ authToken });
  }
);

module.exports = { router };
