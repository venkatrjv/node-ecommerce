const orders = require('./c_orders');
const products = require('./c_products');
const auth = require("./c_auth");

module.exports = {
    auth: auth,
    orders: orders,
    products: products
}