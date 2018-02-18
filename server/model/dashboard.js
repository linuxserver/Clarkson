var db = require("../db/mysql");

module.exports = (function() {

    var getTopStats, getMonthlyFuelCosts;

    getTopStats = function(userId, done) {

        db.get().query("CALL Dashboard_GetTopStats(?)", userId, function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, results[0]);
        });
    };

    getMonthlyFuelCosts = function(userId, done) {

        db.get().query("CALL Dashboard_GetMonthlyFuelCosts(?)", userId, function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, results[0]);
        });
    };

    return {
        getTopStats,
        getMonthlyFuelCosts
    };

}());
