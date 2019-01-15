var express = require('express');
var router = express.Router();
var products = require('../models/m_products');
var global = require('./global');

router.get('/', function (req, res, next) {
    products.getAllProducts(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.getOperation(res, rows);
        }
    });
});

router.get('/:id?', function (req, res, next) {
    products.getProductById(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.getOperationSingle(res, rows);
        }
    });
});


module.exports = router;