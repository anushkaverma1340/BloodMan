const express = require('express')
const router = express.Router()

const date = require('date-and-time')

const User = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth')

router.get('/', ensureAuthenticated, (req,res) => {
    res.render('addDonor.ejs', { user: req.user })
})

router.post('/', (req,res) => {

    // Update donatedBy array
    User.updateOne(
        {email:req.user.email}, 
        { $push: { donatedBy: {
            donorName: req.body.donorName,
            donorContactNumber: req.body.donorContactNumber,
            donorEmail: req.body.donorEmail,
            donorAddress: req.body.donorAddress,
            donorBloodGroup: req.body.donorBloodGroup,
            date: date.format(new Date(),'DD MMMM YYYY')
        }}},
        (err, foundWork) => {
            if(err) { res.send(err) }
        }
    );

    // Update availability object
    User.findOne({email:req.user.email}, (err, user) => {
        if(err) { res.send(err) }
        var newValue
        var updateString
        switch(req.body.donorBloodGroup) {
            case "A Positive": 
                newValue = 1 + user.availability.Apositive;
                updateString = 'availability.Apositive';
                break;
            case "A Negative": 
                newValue = 1 + user.availability.Anegative;
                updateString = 'availability.Anegative';
                break;
            case "B Positive": 
                newValue = 1 + user.availability.Bpositive;
                updateString = 'availability.Bpositive';
                break;
            case "B Negative": 
                newValue = 1 + user.availability.Bnegative;
                updateString = 'availability.Bnegative';
                break;
            case "AB Positive": 
                newValue = 1 + user.availability.ABpositive;
                updateString = 'availability.ABpositive';
                break;
            case "ABn Negative": 
                newValue = 1 + user.availability.ABnegative;
                updateString = 'availability.ABnegative';
                break;
            case "O Positive": 
                newValue = 1 + user.availability.Opositive;
                updateString = 'availability.Opositive';
                break;
            case "O Negative": 
                newValue = 1 + user.availability.Onegative;
                updateString = 'availability.Onegative';
                break;
        }
        var update = { $set : {} };
        update.$set[updateString] = newValue;
        User.findOneAndUpdate(
            {email: req.user.email},
            update,
            {new: true},
            (err, user) => {
                if(err) { res.send(err) }
                else { res.redirect('/profile/donated') }
            })
    })
})

module.exports = router