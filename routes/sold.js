var express = require('express');
var router = express.Router()
var Sold = require('../models/sold')

router.get('/', function(req,res,next){
    Sold.getAllSold(function(err,rows){
        if(err)
            res.json(err)
        else
            res.render('sold',{ title: 'List Of Sold', sold: rows})
    })
});

module.exports = router;