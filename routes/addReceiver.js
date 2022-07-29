const express = require('express')
const router = express.Router()

const date = require('date-and-time')

const User = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth')

router.get('/', ensureAuthenticated, (req,res) => {
    res.render('addReceiver.ejs', { user: req.user })
})

router.post('/', (req,res) => {

    // Update donatedBy array
    User.updateOne(
        {email:req.user.email}, 
        { $push: { receivedBy: {
            receiverName: req.body.receiverName,
            receiverContactNumber: req.body.receiverContactNumber,
            receiverEmail: req.body.receiverEmail,
            receiverAddress: req.body.receiverAddress,
            receiverBloodGroup: req.body.receiverBloodGroup,
            receivedAmount: req.body.receivedAmount,
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
        switch(req.body.receiverBloodGroup) {
            case "A Positive": 
                newValue = user.availability.Apositive - req.body.receivedAmount;
                updateString = 'availability.Apositive';
                break;
            case "A Negative": 
                newValue = user.availability.Anegative - req.body.receivedAmount;
                updateString = 'availability.Anegative';
                break;
            case "B Positive": 
                newValue = user.availability.Bpositive - req.body.receivedAmount;
                updateString = 'availability.Bpositive';
                break;
            case "B Negative": 
                newValue = user.availability.Bnegative - req.body.receivedAmount;
                updateString = 'availability.Bnegative';
                break;
            case "AB Positive": 
                newValue = user.availability.ABpositive - req.body.receivedAmount;
                updateString = 'availability.ABpositive';
                break;
            case "ABn Negative": 
                newValue = user.availability.ABnegative - req.body.receivedAmount;
                updateString = 'availability.ABnegative';
                break;
            case "O Positive": 
                newValue = user.availability.Opositive - req.body.receivedAmount;
                updateString = 'availability.Opositive';
                break;
            case "O Negative": 
                newValue = user.availability.Onegative - req.body.receivedAmount;
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
                else { res.redirect('/profile/received') }
            })
    })
})

module.exports = router