var db = require('../connection/dbconnection'); //reference of dbconnection.js

var products = {
    getAllProducts: function (data, callback) {
        return db.query("call spGetAllProducts(?,?,?,?,?,?)", [data.actionMode, data.parameter1, data.parameter2, data.parameter3, data.parameter4, data.parameter5], callback)
    },
    getProductById: function (data, callback) {
        return db.query("call spGetProductById(?,?,?,?,?,?)", [data.actionMode, data.parameter1, data.parameter2, data.parameter3, data.parameter4, data.parameter5], callback)
    }
};
module.exports = products;