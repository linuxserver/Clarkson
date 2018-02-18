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

router.get("/monthlyFuelCosts", function(req, res) {

    Dashboard.getMonthlyFuelCosts(req.token.id, function(error, monthlyFuelCosts) {

        if (error) {
            return response.internalError(res, error);
        }

        response.handle(res, { monthlyFuelCosts }, error);
    });
});

module.exports = router;
