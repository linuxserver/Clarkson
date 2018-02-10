var db = require("../db/mysql");

module.exports = (function() {

    var create, update, remove, find, findAll;

    create = function(userId, data, done) {

        var guid = db.generateGUID(),
            values = [
                guid,
                userId,
                data.name,
                data.registration,
                data.make,
                data.model,
                data.picture,
                data.yearOfManufacture,
                data.vin,
                data.engineSizeCC,
                data.fuelType
            ];

        db.get().query("CALL Vehicle_Insert(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", values, function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, guid);
        });
    };

    update = function(id, data, done) {

        var values = [
            id,
            data.name,
            data.registration,
            data.make,
            data.model,
            data.picture,
            data.yearOfManufacture,
            data.vin,
            data.engineSizeCC,
            data.fuelType
        ];

        db.get().query("CALL Vehicle_UpdateById(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", values, function(error, results) {

            if (error) {
                return done(error);
            }

            return done();
        });
    };

    find = function(id, done) {

        db.get().query("CALL Vehicle_GetById(?)", id, function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, results[0][0]);
        });
    };

    findAll = function(userId, done) {

        db.get().query("CALL Vehicle_GetByUser(?)", userId, function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, results[0]);
        });
    };

    remove = function(id, done) {

        db.get().query("CALL Vehicle_DeleteById(?)", id, function(error, results) {

            if (error) {
                return done(error);
            }

            return done();
        });
    };

    return {
        create,
        update,
        remove,
        find,
        findAll
    };

}());
