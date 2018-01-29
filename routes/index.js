var express = require('express');
var router = express.Router();
var product = require('../models/products')
var order = require('../models/orders')
var async = require('async');

/* GET home page. */
router.get('/alyumna', function(req, res, next) {

  var data = {};
  
  async.parallel([
    function(done) {
      order.getAllOrderProductCount(function(err, results) {
            if (err) return done(err);
            data.table1 = results;
            done();
        });
    },
    function(done) {
        order.getOrderDataByDate(function(err, results) {
            if (err) return done(err);
            var value = [];
            for(var i = 0; i<12; i++)
            {
                try{
                    if(results[i]['Month'] == (i+1))
                        value.push(results[i]['Total']);
                }
                catch(err){
                    value.push(0);    
                }
            }
            var chart = {};
            chart.year = results[0]['Year'];
            chart.info = value;
            data.table2 = chart;
            done();
        });
    }
  ], function(err) {
        if (err) console.log(err);
        //res.json(data);
        res.render('index', 
            { title: 'Alyumnaa Collection Malaysia' , 
              data});
  });

});

module.exports = router;
