const express = require('express')
const router = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth')

router.get('/', ensureAuthenticated, (req,res) => {
    if(req.user.receivedBy.length === 0) res.render('msg.ejs', { msg: 'No receivers yet!', addType: 'addDonor' })
    else res.render('received.ejs', { user: req.user })
})

module.exports = router