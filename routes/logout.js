const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../middleware/auth');

router.get('/', (req, res) => {
    req.logout(err => {
      if(err) res.send(err)
      req.flash('success_msg', 'You are logged out')
      res.redirect('/login')
    });
  });
  
  module.exports = router;