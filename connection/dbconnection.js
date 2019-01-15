var mysql = require('mysql');
var connection = mysql.createPool({
    host: '207.148.119.28',
    user: 'venkat',
    password: 'root',
    database: 'ecom'

});


module.exports = connection;