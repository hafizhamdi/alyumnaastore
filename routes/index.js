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
            if(results[0]['count1'])
                x.count1 = commaNumber(results[0]['count1']);
            else
                x.count1 = 0;
            if(results[0]['count2'])        
                x.count2 = commaNumber(results[0]['count2'])
            else
                x.count2 = 0;
            if(results[0]['qty'])    
                x.qty = commaNumber(results[0]['qty'])
            else
                x.qty = 0;
            if(results[0]['total'])    
                x.total = commaNumber(results[0]['total'])
            else
                x.total = 0;
                
            data.table1 = x;
            done();
        });
    },
    function(done) {
        order.getOrderDataByDate(function(err, results) {
            if (err) return done(err);
            var value = [];
            var monthly = {};

            console.log(results.length)
            for(var i = 0; i<11; i++)
            {
                try{
                    if(results[i]['Month'] == 1)
                        value.push(results[i]['Total']);
                    else
                        value.push(0);    
                    if(results[i]['Month'] == 2)
                        value.push(results[i]['Total']);
                    if(results[i]['Month'] == 3)
                        value.push(results[i]['Total']);            
                    if(results[i]['Month'] == 4)
                        value.push(results[i]['Total']);            
                    if(results[i]['Month'] == 5)
                        value.push(results[i]['Total']);            
                    if(results[i]['Month'] == 6)
                        value.push(results[i]['Total']);            
                    if(results[i]['Month'] == 7)
                        value.push(results[i]['Total']);            
                    if(results[i]['Month'] == 8)
                        value.push(results[i]['Total']);            
                    if(results[i]['Month'] == 9)
                        value.push(results[i]['Total']);            
                    if(results[i]['Month'] == 10)
                        value.push(results[i]['Total']);            
                    if(results[i]['Month'] == 11)
                        value.push(results[i]['Total']);            
                    if(results[i]['Month'] == 12)
                        value.push(results[i]['Total']);            
                    if(results[i]['Month'] == 13)
                        value.push(results[i]['Total']);  
                        
                }
                catch(err){value.push(0);}        
                /*if(i==0) value.push(0); //for jan
                try{
                    if(results[i]['Month'] == (2))
                        value.push(results[i]['Total']);
                    else
                        value.push(results[i]['Total']);        
                }
                catch(err){
                    value.push(0);    
                }*/
            }
            console.log(value)
            var chart = {};
            chart.year = 2018; //results[0]['Year'];
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
