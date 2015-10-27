var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var donationSchema = require('../models/donationSchema');

//retrieves data from the database
router.get('/getSites',function(req,res,next){
    donationSchema.find(function(err,thinkorganized){
        res.json(thinkorganized);
    })
});


//Sends body to the database
router.post('/addSites', function(req,res,next){
    console.log(req.body);
    donationSchema.create(req.body,function(err,post){
        res.send('all good');
    })
});


//Delete site from database?






module.exports = router;

