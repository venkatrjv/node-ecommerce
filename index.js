var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require("http");
var routes = require('./controller/index');

//
//! ───────────────────────────────────────────────────────────── CROSS ORIGIN ─────
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

Object.keys(routes).forEach(element => {
  app.use("/" + element, routes[element]);
});

//
// ──────────────────────────────────────────────── DEVELOPMENT ERROR HANDLER ─────

// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      // res.render('error', {
      //     message: err.message,
      //     error: err
      // });
      res.send(err);
  });
}


module.exports = app;

//
// ───────────────────────────────────────────────────────────────── LISTENER ─────
app.listen("4222", function (err, rows) {
  if (err) {
      res.json(err);
  } else {
      console.log("Server Started..");
  }
});