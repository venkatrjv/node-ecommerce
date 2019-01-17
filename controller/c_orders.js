var express = require('express');
var router = express.Router();
var orders = require('../models/m_orders');
var global = require('./global');

//
// ────────────────────────────────────────────── I ──────────
//#region   :::::: G E T : :  :   :    :     :        :          :



router.get('/', function (req, res, next) {
    orders.getAllOrders(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.getOperation(res, rows);
        }
    });
});

router.get('/:id?', function (req, res, next) {
    orders.getOrderByID(req.params, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.getOperationSingle(res, rows);
        }
    });
});

router.get('/getOrderDetailsByID/:id?', function (req, res, next) {
    orders.getOrderDetailsByID(req.params, function (err, rows) {
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
    orders.deleteOrder(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            var count = 0;
            req.body.products.forEach(order => {
                orders.addOrderDetails(order, function (err, rows) {
                    count++;
                    if (err) {
                        return next(err);
                    } else {
                        if (count == req.body.products.length)
                            return global.postOperation(res, rows);
                    }
                });
            });
        }
    });
});

//#endregion ────────────────────────────────────────────────────────
//

//
// ──────────────────────────────────────────────────── I ──────────
//#region   :::::: U P D A T E : :  :   :    :     :        :          :

router.put('/updateOrder', function (req, res, next) {
    orders.getOrderByID(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            if (rows.is_approved === 0) {
                orders.updateOrder(req.body, function (err, rows) {
                    if (err) {
                        return next(err);
                    } else {
                        res.json(rows);
                    }
                });
            } else {
                return res.status(400).json({
                    "status": 400,
                    "message": "Order already approved"
                });
            }
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