var express = require('express');
var router = express.Router();
var products = require('../models/m_products');
var global = require('./global');

router.get('/getAllCategory', function (req, res, next) {
    products.getAllCategory(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.getOperation(res, rows);
        }
    });
});


router.get('/getAllProducts', function (req, res, next) {
    products.getAllProducts(function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.getOperation(res, rows);
        }
    });
});

router.get('/product/:id?', function (req, res, next) {
    products.getProductById(req.params, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.getOperationSingle(res, rows);
        }
    });
});

router.get('/getProductByCategoryID/:id?', function (req, res, next) {
    products.getProductByCategoryID(req.params, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.getOperation(res, rows);
        }
    });
});


module.exports = router;