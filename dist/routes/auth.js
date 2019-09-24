"use strict";

const {
  Router
} = require('express');

const bcrypt = require('bcryptjs');

const User = require('../models/User');

const {
  isAuth
} = require('../utils');

const router = Router();
/*
 * ------------------------------------------------------------------
 * IS COOKIE VALID
 */

router.post('/test', isAuth, (req, res) => {
  res.status(200).json({
    success: true
  });
});
/*
 * ------------------------------------------------------------------
 * LOGIN
 */

router.post('/login', (req, res) => {
  const {
    email,
    password
  } = req.body;
  User.findOne({
    email
  }).then(user => {
    if (!user) {
      return res.status(404).json({
        message: `User with the email address: ${email} not found`
      });
    }

    return bcrypt.compare(password, user.password).then(doMatch => {
      if (!doMatch) {
        res.status(400).json({
          message: 'Authentication failed, invalid password'
        });
      }

      req.session.isLoggedIn = true;
      req.session.user = user;
      res.status(200).json({
        message: 'Authentication succeeded'
      });
    }).catch(() => {
      res.status(500).json({
        message: 'Decryption failed'
      });
    });
  }).catch(() => {
    res.status(401).json({
      message: 'Authentication failed, invalid username or password'
    });
  });
});
/*
 * ------------------------------------------------------------------
 * LOGOUT
 */

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});
module.exports = router;