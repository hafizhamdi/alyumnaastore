var db = require('../dbconnection');

var Products = {
    getAllProducts : function(callback){
        return db.query("SELECT *, (quantity*price) AS total FROM products ORDER BY date_add ASC", callback);
    },

    getAllProductCount : function(callback){
        return db.query("SELECT COUNT(*) AS count FROM products", callback);
    },

    getProductById : function(id, callback){
        return db.query("SELECT * FROM products WHERE id=?", [id], callback);
    },

    addProduct : function(Products, callback){
        var date = new Date();
        var datetime = date.toLocaleDateString() + " " + 
                       date.toLocaleTimeString();
        return db.query("INSERT INTO products VALUES (?,?,?,?,?,?)",
            [Products.id,
             Products.name,
             'oooo',
             Products.quantity,
             Products.price,
             datetime], callback);
    },

    deleteProduct : function(id, callback){
        return db.query("DELETE FROM products WHERE id=?", [id], callback);
    },

    updateProduct : function(id, Products, callback){
        var date = new Date();
        var datetime = date.toLocaleDateString() + " " + 
                       date.toLocaleTimeString();
        console.log('Im in update.. ikick u');

        console.log("name:" + Products.name + "\n" +
                "quantity:" + Products.quantity + "\n"+
                "price:" + Products.price + "\n"+
                "datetime:" + datetime + "\n" + 
                "id:" + id);

        return db.query(`UPDATE products SET name=?, quantity=?, description=?, 
            price=?, date_add=? WHERE id=?`,
            [Products.name, 
             Products.quantity, 
             "test",
             Products.price,
             datetime, 
             id], callback);
    }
};

module.exports = Products;