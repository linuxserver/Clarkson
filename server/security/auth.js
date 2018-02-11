var jwt         = require("jsonwebtoken"),
    _           = require("lodash"),
    response    = require("../response"),
    config      = require("../config");

module.exports = (function() {

    return {

        verifyRegistrations(req, res, next) {

            if (config.enableRegistration === "true") {
                next();
            } else {
                return response.forbidden(res, "Registrations are closed");
            }
        },

        verifyUserAdmin(req, res, next) {

            if (req.token.admin || (req.params.id === req.token.id)) {
                next();
            } else {
                return response.forbidden(res, "You do not have permission to view another user's data");
            }
        },

        verify(req, res, next) {

            var authHeader = req.headers.authorization;

            if (authHeader) {

                var token = _.split(authHeader, "JWT ")[1];

                jwt.verify(token, config.auth.jwtSecret, function(error, decodedToken) {

                    if (error) {
                        return response.unauthorised(res, error.message);
                    } else {

                        req.token = decodedToken;
                        next();
                    }
                });

            } else {
                return response.unauthorised(res, "No JWT provided in Authorization header");
            }
        },

        sign(payload) {

            return jwt.sign(payload, config.auth.jwtSecret, {
                expiresIn: "60m"
            });
        }
    };
}());
