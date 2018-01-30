var express = require('express');
var router = express.Router();
var product = require('../models/products')
var order = require('../models/orders')
var async = require('async');
var commaNumber = require('comma-number')

/* GET home page. */
router.get('/alyumna', function(req, res, next) {

  var data = {};
  
  async.parallel([
    function(done) {
      order.getAllOrderProductCount(function(err, results) {
            if (err) return done(err);
            var x = {};
            x.count1 = commaNumber(results[0]['count1']);
            x.count2 = commaNumber(results[0]['count2'])
            x.qty = commaNumber(results[0]['qty'])
            x.total = commaNumber(results[0]['total'])

            data.table1 = x;
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
