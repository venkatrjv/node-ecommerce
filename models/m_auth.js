var db = require('../connection/dbconnection'); //reference of dbconnection.js

var auth = {
    validateLogin: function (data, callback) {
        return db.query("SELECT * FROM tbl_user where username = ? and password = ? and status = 1;", [data.username, data.password], callback)
    },
    addUser: function (user, callback) {
        return db.query("Insert into tbl_user values(?, ?, ?, NULL, NOW(), ?)", [0, user.username, user.password, 0, 0, 1], callback);
    }
};
module.exports = auth;