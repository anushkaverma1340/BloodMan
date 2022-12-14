const express = require('express')
const router = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth')

router.get('/', ensureAuthenticated, (req,res) => {
    if(req.user.donatedBy.length === 0) res.render('msg.ejs', { msg: 'No donors yet!', addType: 'addDonor' })
    else res.render('donated.ejs', { user: req.user })
})

module.exports = router