var db = require('../connection/dbconnection'); //reference of dbconnection.js

var auth = {
    validateLogin: function (data, callback) {
        return db.query("SELECT * FROM users where username = ? and password = ? and status = 1;", [data.username, data.password], callback)
    },
    addUser: function (user, callback) {
        return db.query("Insert into users values(?, ?, ?, ?, ?, ?, NOW(), NULL, 1)", [0, user.email, user.username, user.password, user.firstName, user.lastName], callback);
    },
    deleteUser: function (user, callback) {
        return db.query("update users set status = 0 where id=?", [id], callback);
    }
};
module.exports = auth;