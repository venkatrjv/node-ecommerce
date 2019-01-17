var db = require('../connection/dbconnection'); //reference of dbconnection.js

var orders = {
    getAllOrders: function (data, callback) {
        return db.query("select * from sales_orders where user_id = ?", [data.id], callback)
    },
    getOrderDetailsByID: function (data, callback) {
        return db.query("select * from order_products where order_id = ?", [data.id], callback)
    },
    getOrderByID: function (data, callback) {
        return db.query("select * from sales_orders where id = ?", [data.id], callback)
    },
    addOrder: function (order, callback) {
        return db.query("Insert into sales_orders values(?, NOW(), ?, ?, ?, NOW(),NULL, ?)", [0, 0, order.total, 0, order.userID, 0, 0, 1], callback);
    },
    updateOrder: function (order, callback) {
        return db.query("update sales_orders set total = ?, updated_at = NOW() where id = ?", [order.total, 0, order.id], callback);
    },
    updateOrderApproved: function (order, callback) {
        return db.query("update sales_orders set is_approved = 1, updated_at = NOW() where id = ?", [0, 0, order.id], callback);
    },
    deleteOrder: function (data, callback) {
        return db.query("update order_products set status = 0 where id=?", [data.id], callback);
    },
    addOrderDetails: function (order, callback) {
        return db.query("Insert into order_products values(?, ?, ?, ?, ?, ?, ?, NOW(),NULL)", [0, order.order_id, order.name, order.description, order.price, order.quantity, order.subtotal, 0, 0], callback);
    },
    updateOrderDetails: function (order, callback) {
        return db.query("update order_products set price = ?, quantity = ?, subtotal = ?, updated_at = NOW() where id = ?", [order.price, order.quantity, order.subtotal, 0, order.id], callback);
    },
    deleteOrderDetails: function (data, callback) {
        return db.query("delete from sales_orders where id=?", [data.id], callback);
    }
};
module.exports = orders;