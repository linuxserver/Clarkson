var Router      = require("express").Router,
    router      = new Router(),
    _           = require("lodash"),
    response    = require("../response"),
    auth        = require("../security/auth"),
    hashUtil    = require("../security/hash"),
    config      = require("../config"),
    User        = require("../model/user");

router.post("/", auth.verifyRegistrations, function(req, res) {

    hashUtil.makeHash(req.body.password, function(error, hash) {

        if (error) {
            return response.internalError(res, error);
        }

        req.body.password = hash;

        User.create(req.body, function(sqlError, userId) {

            if (sqlError) {
                return response.internalError(res, sqlError);
            }

            User.find(userId, function(sqlError, user) {

                delete user.password;
                response.handle(res, { user }, error);
            });
        });
    });
});

router.get("/", [auth.verify, auth.verifyUserAdmin], function(req, res) {

    User.findAll(function(error, users) {

        _.forEach(users, function(user) {
            delete user.password;
        });

        response.handle(res, { users }, error);
    });
});

router.get("/:id", [auth.verify, auth.verifyUserAdmin], function(req, res) {

    User.find(req.params.id, function(error, user) {

        if (user) {
            delete user.password;
        }

        response.handle(res, { "user": user }, error);
    });
});

router.put("/:id/updatePreferences", [auth.verify, auth.verifyUserAdmin], function(req, res) {

    User.updatePreferences(req.params.id, req.body, function(error) {
        response.handle(res, { status: "Preferences updated" }, error);
    });
});

module.exports = router;
