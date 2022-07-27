const express = require('express')
const router = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth')

router.get('/', ensureAuthenticated, (req,res) => {
    res.render('profile.ejs', { user: req.user })
})

module.exports = router