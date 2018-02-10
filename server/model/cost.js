var db = require("../db/mysql");

module.exports = (function() {

    var findAll, find, create, update, remove;

    findAll = function(vehicleId, done) {

        db.get().query("CALL Cost_GetByVehicle(?)", vehicleId, function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, results[0]);
        });
    };

    find = function(costId, done) {

        db.get().query("CALL Cost_GetById(?)", costId, function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, results[0][0]);
        });
    };

    create = function(vehicleId, data, done) {

        var guid = db.generateGUID(),
            values = [
                guid,
                vehicleId,
                data.date != null ? data.date : db.CURRENT_TIMESTAMP,
                data.costType,
                data.totalCost,
                data.invoice,
                data.notes
            ];

        db.get().query("CALL Cost_Insert(?, ?, ?, ?, ?, ?, ?)", values, function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, guid);
        });
    };

    update = function(costId, data, done) {

            var values = [
                costId,
                data.date != null ? data.date : db.CURRENT_TIMESTAMP,
                data.costType,
                data.totalCost,
                data.invoice,
                data.notes
            ];

        db.get().query("CALL Cost_UpdateById(?, ?, ?, ?, ?, ?)", values, function(error, results) {

            if (error) {
                return done(error);
            }

            return done();
        });
    };

    remove = function(costId, done) {

        db.get().query("CALL Cost_DeleteById(?)", costId, function(error, results) {

            if (error) {
                return done(error);
            }

            return done();
        });
    };

    return {
        findAll,
        find,
        create,
        update,
        remove
    };

}());
