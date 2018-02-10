var Router      = require("express").Router,
    router      = new Router(),
    response    = require("../response"),
    Dashboard        = require("../model/dashboard");

router.get("/", function(req, res) {

    Dashboard.getTopStats(req.token.id, function(error, topStats) {

        if (error) {
            return response.internalError(res, error);
        }

        response.handle(res, { topStats }, error);
    });
});

module.exports = router;
