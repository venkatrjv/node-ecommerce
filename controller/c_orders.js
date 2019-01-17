var express = require('express');
var router = express.Router();
var orders = require('../models/m_orders');
var global = require('./global');

//
// ────────────────────────────────────────────── I ──────────
//#region   :::::: G E T : :  :   :    :     :        :          :



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

router.get('/getOrderDetailsByID/:id?', function (req, res, next) {
    orders.getOrderDetailsByID(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.getOperationSingle(res, rows);
        }
    });
});

//#endregion ────────────────────────────────────────────────────────
//

//
// ──────────────────────────────────────────────── I ──────────
//#region   :::::: A D D : :  :   :    :     :        :          :

router.post('/addOrder', function (req, res, next) {
    orders.addOrder(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.postOperation(res, rows);
        }
    });
});

router.post('/addOrderDetails', function (req, res, next) {
    var count = 0;
    req.body.forEach(order => {
        orders.addOrderDetails(order, function (err, rows) {
            count++;
            if (err) {
                return next(err);
            } else {
                if (count == req.body.length)
                    return global.postOperation(res, rows);
            }
        });
    });
});

//#endregion ────────────────────────────────────────────────────────
//

//
// ──────────────────────────────────────────────────── I ──────────
//#region   :::::: U P D A T E : :  :   :    :     :        :          :

router.put('/updateOrder', function (req, res, next) {
    orders.updateOrder(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            res.json(rows);
        }
    });
});

router.put('/updateOrderApproved/:id', function (req, res, next) {
    orders.updateOrderApproved(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            res.json(rows);
        }
    });
});

router.put('/updateOrderDetails', function (req, res, next) {
    orders.updateOrderDetails(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            res.json(rows);
        }
    });
});

//#endregion ────────────────────────────────────────────────────────
//


//
// ──────────────────────────────────────────────────── I ──────────
//#region   :::::: D E L E T E : :  :   :    :     :        :          :

router.post('/deleteOrder', function (req, res, next) {
    orders.deleteOrder(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.postOperation(res, rows);
        }
    });
});

router.post('/deleteOrderDetails', function (req, res, next) {
    orders.deleteOrderDetails(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.postOperation(res, rows);
        }
    });
});

//#endregion ────────────────────────────────────────────────────────
//

module.exports = router;