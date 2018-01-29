var express = require('express');
var router = express.Router()
var Products = require('../models/products')


router.get('/', function(req,res,next){
    Products.getAllProducts(function(err,rows){
        if(err)
            res.json(err)
        else
            res.render('products',{ title: 'Alyumnaa Store', products: rows})
    })
});


/*
router.put('/update2:id', function(req,res,next){
    Products.updateProduct(req.params.id, req.body,function(err, data){
        console.log("Im updating")
        (err)?res.json(err) :  res.json('/products')
    })  
});
*/

router.delete('/delete/:id', function(req,res,next){
    Products.deleteProduct(req.params.id, function(err, rows){
        (err)?res.json(err) :  res.json('/products')
    })  
});

/*
router.put('/update/:id', function(req, res, next) {
    Products.updateProduct(req.params.id, req.body, function(err,doc){
        res.send(req.body)
        console.log("putput")
        //if(err)
        //  res.send(err)
       // else
        //res.json({message: 'Successfully update'});
      })
});
*/
router.get('/update/:id', function(req, res, next) {
  Products.getProductById(req.params.id, function(err,rows){
    if(err)
        res.json(err)
    else{
        res.render('update-product', {
            title: 'Update Product: ' + req.params.id,
            products: rows
        });
    }
  })
});

router.post('/update2/:id', function(req,res,next){
    //console.log(req.body)
    Products.updateProduct(req.params.id, req.body,function(err, data){
        (err)?res.json(err) :  res.redirect('/products')
    })  
});

router.get('/new', function(req,res,next){
    res.render('add-product',{ title: 'Add New Product'})
});

router.post('/new', function(req,res,next){
    Products.addProduct(req.body, function(err, data){
        (err)?res.json(err) :  res.redirect('/products')
    })  
});




module.exports = router;