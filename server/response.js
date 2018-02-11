var _ = require("lodash");

module.exports = (function() {

    var noItemsInResponse = function(response) {

        for (var prop in response) {

            if (prop !== 'preferences') {

                var empty = _.isUndefined(response[prop]) || (!_.isArray(response[prop]) && _.isEmpty(response[prop]));
                if (empty) {
                    return true;
                }
            }
        }

        return false;
    };

    var internalError = function(res, message) {

        if (message.sqlMessage !== undefined) {
            message = message.sqlMessage;
        }

        return res.status(500).json({
            status: "Error",
            message
        });
    };

    return {

        unauthorised(res, message) {

            return res.status(401).json({
                status: "Unauthorised",
                message
            });
        },

        forbidden(res, message) {

            return res.status(403).json({
                status: "Forbidden",
                message
            });
        },


        handle(res, response, error) {

            if (error) {
                internalError(res, error);
            } else {

                if (noItemsInResponse(response)) {
                    res.status(404).end();
                } else {
                    res.json(response);
                }
            }
        },

        internalError
    };

}());
