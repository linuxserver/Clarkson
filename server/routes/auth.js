var Router      = require("express").Router,
    router      = new Router(),
    auth        = require("../security/auth"),
    response    = require("../response"),
    hash        = require("../security/hash"),
    User        = require("../model/user");

router.post("/authenticate", function(req, res) {

    if (req.body.username && req.body.password) {

        User.findByUsername(req.body.username, function(error, user) {

            if (user) {

                hash.compareHash(req.body.password, user.password, function(hashError, match) {

                    if (hashError) {
                        return response.internalError(res, hashError);
                    }

                    if (match) {

                        var payload = {
                            id: user.id,
                            admin: user.admin
                        };

                        return response.handle(res, { "token": auth.sign(payload) });

                    } else {
                        return response.forbidden(res, "Incorrect password");
                    }
                });

            } else {
                return response.forbidden(res, "User not found");
            }
        });

    } else {
        return response.unauthorised(res, "Request body missing username or password");
    }
});

module.exports = router;
