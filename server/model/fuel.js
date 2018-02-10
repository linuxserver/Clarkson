var db = require("../db/mysql");

module.exports = (function() {

    var findAll, find, create, update, remove;

    findAll = function(vehicleId, done) {

        db.get().query("CALL Fuel_GetByVehicle(?)", vehicleId, function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, results[0]);
        });
    };

    find = function(fuelId, done) {

        db.get().query("CALL Fuel_GetById(?)", fuelId, function(error, results) {

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
                data.fuelAmount,
                data.totalCost,
                data.fuelUnitCost,
                data.locationLatitude,
                data.locationLongitude,
                data.odometerReading,
                data.notes,
                data.fullTank,
                data.missedFillUp
            ];

        db.get().query("CALL Fuel_Insert(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", values, function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, guid);
        });
    };

    update = function(fuelId, data, done) {

        var values = [
            fuelId,
            data.date != null ? data.date : db.CURRENT_TIMESTAMP,
            data.fuelAmount,
            data.totalCost,
            data.fuelUnitCost,
            data.locationLatitude,
            data.locationLongitude,
            data.odometerReading,
            data.notes,
            data.fullTank,
            data.missedFillUp
        ];

        db.get().query("CALL Fuel_UpdateById(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", values, function(error, results) {

            if (error) {
                return done(error);
            }

            return done();
        });
    };

    remove = function(fuelId, done) {

        db.get().query("CALL Fuel_DeleteById(?)", fuelId, function(error, results) {

            if (error) {
                return done(error);
            }

            return done();
        });
    };

    return {
        findAll, find, create, update, remove
    };

}());
