var express = require('express');
var router = express.Router();
var auth = require('../models/m_auth');
var global = require('./global');
const Joi = require('joi');
const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
});

router.post('/validate', function (req, res, next) {
    try {
        if (global.validationSchema(req.body, schema, next))
            auth.validateLogin(req.body, function (err, rows) {
                if (err) {
                    return next(err);
                } else {
                    return global.postOperation(res, rows);
                }
            });
    } catch (error) {
        global.catchOperation(error, next);
    }
});

router.post('/addUser', function (req, res, next) {
    auth.addUser(req.body, function (err, rows) {
        if (err) {
            return next(err);
        } else {
            return global.postOperation(res, rows);
        }
    });
});

module.exports = router;