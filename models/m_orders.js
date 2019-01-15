var db = require('../connection/dbconnection'); //reference of dbconnection.js

var orders = {
    getAllOrders: function (data, callback) {
        return db.query("call spGetAllOrders(?,?,?,?,?,?)", [data.actionMode, data.parameter1, data.parameter2, data.parameter3, data.parameter4, data.parameter5], callback)
    },
    getOrderByID: function (data, callback) {
        return db.query("call spGetOrderByID(?,?,?,?,?,?)", [data.actionMode, data.parameter1, data.parameter2, data.parameter3, data.parameter4, data.parameter5], callback)
    }
};
module.exports = orders;