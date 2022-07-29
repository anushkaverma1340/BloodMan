require('dotenv').config();
const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require("path");

const app = express();

// Passport Config
require('./middleware/passport')(passport);

// Public folder
app.use("/public", express.static(path.join(__dirname + "/public")));

// DB Config
// const db = require('./config/keys').mongoURI;

// Connect to MongoDB
require('./config/database')

// EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/navpages', require('./routes/navpages.js'));
app.use('/login', require('./routes/login.js'));
app.use('/register', require('./routes/register.js'));
app.use('/profile', require('./routes/profile.js'));
app.use('/profile/availability', require('./routes/availability.js'));
app.use('/profile/donated', require('./routes/donated.js'));
app.use('/profile/addDonor', require('./routes/addDonor.js'));
app.use('/profile/received', require('./routes/received.js'));
app.use('/profile/addReceiver', require('./routes/addReceiver.js'));
app.use('/logout', require('./routes/logout.js'));

app.get('/test', (req,res) => {
  console.log(new Date().toDateString())
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
