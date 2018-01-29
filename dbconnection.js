var mysql = require('mysql')
var conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alyumnadb'
})

module.exports = conn;