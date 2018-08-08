var db = require("../db/mysql");

module.exports = (function() {

    var find, findAll, findByUsername, findByEmail, create, updatePreferences;

    find = function(userId, done) {

        db.get().query("CALL User_GetById(?)", userId, function(error, results) {

            if (error) {
                return done(error);
            }

            var sqlUser = results[0][0], user = {

                id: sqlUser.id,
                email: sqlUser.email,
                username: sqlUser.username,
                password: sqlUser.password,
                admin: sqlUser.admin,
                preferences: {

                    fuelUnit: {
                        id: sqlUser.fuelUnitId,
                        unit: sqlUser.fuelUnit,
                        unitName: sqlUser.fuelUnitName
                    },
                    distanceUnit: {
                        id: sqlUser.distanceUnitId,
                        unit: sqlUser.distanceUnit,
                        unitName: sqlUser.distanceUnitName
                    },
                    fuelConsumptionUnit: {
                        id: sqlUser.fuelConsumptionUnitId,
                        unit: sqlUser.fuelConsumptionUnit,
                        unitName: sqlUser.fuelConsumptionUnitName
                    },
                    currencyUnit: {
                        id: sqlUser.currencyUnitId,
                        unit: sqlUser.currencyUnit,
                        unitName: sqlUser.currencyUnitName,
                        symbol: sqlUser.currencyUnitSymbol
                    }
                }
            };

            return done(null, user);
        });
    };

    findAll = function(done) {

        db.get().query("CALL User_GetAll()", function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, results[0]);
        });
    };

    findByUsername = function(username, done) {

        db.get().query("CALL User_GetByUsername(?)", username, function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, results[0][0]);
        });
    };

    findByEmail = function(email, done) {

        db.get().query("CALL User_GetByEmail(?)", email, function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, results[0][0]);
        });
    };

    updatePreferences = function(userId, userPreferences, done) {

        var values = [
            userId,
            userPreferences.fuelUnit.id,
            userPreferences.fuelConsumptionUnit.id,
            userPreferences.distanceUnit.id,
            userPreferences.currencyUnit.id
        ];

        db.get().query("CALL User_UpdatePreferencesById(?, ?, ?, ?, ?)", values, function(error, results) {

            if (error) {
                return done(error);
            }

            return done();
        });
    };

    create = function(user, done) {

        var guid = db.generateGUID(),
            values = [
                guid,
                user.email,
                user.username,
                user.password
            ];

        db.get().query("CALL User_Insert(?, ?, ?, ?)", values, function(error, results) {

            if (error) {
                return done(error);
            }

            return done(null, guid);
        });
    };

    remove = function(user, done) {

        db.get().query("CALL User_DeleteById(?)", user, function(error, results) {

            if (error || results[0][0].status === 1) {
                return done(error);
            }

            return done(null);
        });
    };

    clearData = function(user, done) {

        db.get().query("CALL User_ClearById(?)", user, function(error, results) {
            
            if (error || results[0][0].status === 1) {
                return done(error);
            }

            return done(null);
        });
    };

    return {
        find,
        findAll,
        findByUsername,
        findByEmail,
        create,
        updatePreferences,
        remove,
        clearData
    };

}());
