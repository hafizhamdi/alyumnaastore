var mysql = require('mysql')
var conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: 'alyumnadb'
})

module.exports = conn;