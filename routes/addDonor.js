const express = require('express')
const router = express.Router()
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth')

router.get('/', ensureAuthenticated, (req,res) => {
    res.render('addDonor.ejs', { user: req.user })
})

router.post('/', (req,res) => {
    const newDonor = {
        donorName: req.body.donorName,
        donorContactNumber: req.body.donorContactNumber,
        donorEmail: req.body.donorEmail,
        donorAddress: req.body.donorAddress,
        donorBloodGroup: req.body.donorBloodGroup,
        date: req.body.date
    }
    req.user.donatedBy.push(newDonor)
    res.render('donated.ejs', { user: req.user })
})

module.exports = router