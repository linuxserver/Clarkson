var db = require("../db/mysql");

module.exports = (function() {

    var findAll;

    findAll = function(done) {

        db.get().query("SELECT * FROM FuelConsumptionUnits", function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, results);
        });
    };

    return {
        findAll
    };

}());
