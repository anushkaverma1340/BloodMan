const express = require('express')
const router = express.Router()

router.get('/about', (req,res) => res.render('about.ejs'))

router.get('/benefits', (req,res) => res.render('benefits.ejs'))

router.get('/event', (req,res) => res.render('event.ejs'))

router.get('/features', (req,res) => res.render('features.ejs'))

router.get('/guidelines', (req,res) => res.render('guidelines.ejs'))

module.exports = router