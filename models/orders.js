var db = require('../dbconnection');
var Orders = {
    getAllOrders : function(callback){
        return db.query("SELECT * FROM Orders", callback);
    },

    getAllOrderProductCount : function(callback){
        return db.query(`SELECT  (
            SELECT COUNT(*)
            FROM   orders
            ) AS count1,
            (
            SELECT COUNT(*)
            FROM   products
            ) AS count2,
            (
            SELECT SUM(quantity)
            FROM   products
            ) AS qty
            FROM dual`, callback);
    },

    addOrder : function(Orders, callback){
        var now = new Date();
        var date = now.toLocaleDateString();
        var time = now.toLocaleTimeString();

        return db.query(`INSERT INTO 
                    Orders (name, quantity, total, date, time, product_id) 
                    VALUES (?,?,?,?,?,?)`,
        [Orders.name,
        Orders.quantity,
        Orders.total,
        date,
        time,
        Orders.id ], callback);
    },

    getOrderByDate : function(date, callback){
        return db.query("SELECT * FROM orders WHERE date=?", [date], callback);
    },
    getOrderById : function(id, callback){
        return db.query("SELECT * FROM orders WHERE product_id=?", [id], callback);
    },
    getOrderByIdNDate : function(id,date, callback){
        return db.query("SELECT * FROM orders WHERE id=? AND date=?", [id,date], callback);
    },
    
    getOrderDataByDate : function(callback){
        return db.query(`SELECT YEAR(date) as Year,
                MONTH(date) as Month,
                SUM(total) AS Total
                FROM orders
                GROUP BY YEAR(date), MONTH(date)
                ORDER BY YEAR(date), MONTH(date)`, callback);
    }

};
module.exports = Orders;