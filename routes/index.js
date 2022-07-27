const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('mainpage.ejs'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard.ejs', {
    user: req.user
  })
);

module.exports = router;
