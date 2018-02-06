var express = require('express');
var router = express.Router();
var Orders = require('../models/orders')
var Products = require('../models/products')
var async = require('async');
var rowproduct;


router.get('/', function(req,res,next){
    Orders.getAllOrders(function(err,rows){
        if(err)
            res.json(err)
        else{
            res.render('orders',{ title: 'Sold Items', orders: rows});
        }
    })
});

router.get('/new', function(req,res,next){  
    Products.getAllProducts(function(err,rows){
        (err)? res.json(err) : res.render('add-order',{ title: 'Create Order', products: rows})
    });
});

router.get('/date/:date', function(req,res,next){
    Orders.getOrderByDate(req.params.date,function(err,rows){
       (err)?res.json(err):
            res.render('orders',{ title: 'Sold Items', orders: rows});
    })
});

router.get('/id/:id', function(req,res,next){
    Orders.getOrderById(req.params.id,function(err,rows){
       (err)?res.json(err):
            res.render('orders',{ title: 'Sold Items', orders: rows});
    })
});

router.delete('/delete/:id', function(req,res,next){
    Orders.deleteOrder(req.params.id, function(err, rows){
        (err)?res.json(err) :  res.json('/orders')
    })  
});

router.post('/new', function(req,res,next){
    
    var object =req.body;
    var data = {};
    var count = Object.keys(object).length;
    
    var myarr = [];
    var i = 1;
    while(i<= (count/5)){
        data['no'] = object['no['+ i +']'];
        data['id'] = object['id['+ i +']'];
        data['name'] = object['name['+ i +']'];
        data['quantity'] = object['qty['+ i +']'];
        data['total'] = object['price['+ i +']'];
        myarr.push(data);
        data = {};
        i++;
    }

    async.parallel([
        function(done) {
            for(var t = 0; t < myarr.length ;t++){  
                console.log(myarr[t]);
                Orders.addOrder(myarr[t], (function(err, data){
                    if(err) res.json(err);
                }));
            }
            done();
        },

        function(done){
            //update quantity product
            for(var t = 0; t < myarr.length ;t++){
                var id = myarr[t]['id'];
                Products.updateProductQty(id, myarr[t],function(err,data){
                    if(err) res.json(err);
                })
            }
            done();
        }], function(err){
            (err)? res.json(err):res.redirect('/orders'); 
    });
              
  /*  var totcnt=0;
    for(var t = 0; t < myarr.length ;t++){  
        Orders.addOrder(myarr[t], (function(err, data){

            if(err){
                res.json(err);
            }else{
                var j = t;
                return function(){
                    var id = myarr[j]['id'];
                    Products.updateProductQty(id, myarr[j],function(err,data){
                        (err)?res.json(err): ++totcnt; console.log("added 1")
                        
                    })    
                    console.log(totcnt);    
                    //++totcnt;
                    //code executed after all processing tasks has completed
                    if(totcnt==myarr.length){
                       res.redirect('/orders');     
                    }
                }
            }
        })());         
    }*/

}); 
//});
module.exports = router;
