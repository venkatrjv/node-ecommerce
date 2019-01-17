var db = require('../connection/dbconnection'); //reference of dbconnection.js

var products = {
    getAllProducts: function (callback) {
        return db.query("select * from products where status = 1", [], callback)
    },
    getAllCategory: function (data, callback) {
        return db.query("select * from categories where status = 1", [], callback)
    },
    getProductById: function (data, callback) {
        return db.query("select * from products where id = ? ", [data.id], callback)
    },
    getProductByCategoryID: function (data, callback) {
        return db.query("select * from products where category_id = ? and status = 1", [data.id], callback)
    }
};

module.exports = products;