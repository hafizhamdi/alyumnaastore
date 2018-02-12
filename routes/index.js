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
            var month = [0,0,0,0,0,0,0,0,0,0,0,0];
            console.log(results.length)
            var i =0;
            while(i<12){
                try{
                    if(results[i]['Month'] == 1)
                        month.splice(0,1,results[i]['Total']);
                    if(results[i]['Month'] == 2)
                        month.splice(1,2,results[i]['Total']);    
                    if(results[i]['Month'] == 3)
                        month.splice(2,3,results[i]['Total']);
                    if(results[i]['Month'] == 4)
                        month.splice(3,4,results[i]['Total']);
                    if(results[i]['Month'] == 5)
                        month.splice(4,5,results[i]['Total']);    
                    if(results[i]['Month'] == 6)
                        month.splice(5,6,results[i]['Total']);
                    if(results[i]['Month'] == 7)
                        month.splice(6,7,results[i]['Total']);
                    if(results[i]['Month'] == 8)
                        month.splice(7,8,results[i]['Total']);    
                    if(results[i]['Month'] == 9)
                        month.splice(8,9,results[i]['Total']);
                    if(results[i]['Month'] == 10)
                        month.splice(9,10,results[i]['Total']);
                    if(results[i]['Month'] == 11)
                        month.splice(10,11,results[i]['Total']);
                    if(results[i]['Month'] == 12)
                        month.splice(11,12,results[i]['Total']);   
                }
                catch(err){value.push(0);}   
                i++;     
            }
            console.log(value)
            console.log(month)
            var chart = {};
            chart.year = 2018; //results[0]['Year'];
            chart.info = month;
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
