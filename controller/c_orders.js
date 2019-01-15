var express = require('express');
var router = express.Router();
var orders = require('../models/m_orders');
var global = require('./global');

router.get('/', function (req, res, next) {
    debugger;
    orders.getAllOrders(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.getOperation(res, rows);
        }
    });
});

router.get('/:id?', function (req, res, next) {
    orders.getOrderByID(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.getOperationSingle(res, rows);
        }
    });
});


module.exports = router;