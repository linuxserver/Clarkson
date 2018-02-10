var mysql   = require("mysql"),
    conf    = require("../config");

var state = {
    pool: null
};

var resultsHandler = function(field, next) {

    if (field.type === "TINY" && field.length === 1) {
        return field.string() === "1";
    }

    return next();
};

exports.connect = function(done) {

    state.pool = mysql.createPool({

        host: conf.mysql.host,
        user: conf.mysql.user,
        password: conf.mysql.password,
        database: "clarkson",
        typeCast: resultsHandler
    });

    done();
};

exports.get = function() {
    return state.pool;
};

exports.generateGUID = function() {

    return "xxxxxxxx-xxxx-4xxx-yxxxx-xxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
};

exports.CURRENT_TIMESTAMP = {

    toSqlString() {
        return "CURRENT_TIMESTAMP()";
    }
};
