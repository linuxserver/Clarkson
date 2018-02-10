var Router      = require("express").Router,
    router      = new Router(),
    response    = require("../response"),
    Vehicle     = require("../model/vehicle"),
    Cost        = require("../model/cost"),
    Fuel        = require("../model/fuel"),
    User        = require("../model/user");

// VEHICLE
// -------
router.get("/", function(req, res) {

    Vehicle.findAll(req.token.id, function(error, vehicles) {
        response.handle(res, { vehicles }, error);
    });
});

router.get("/:id", function(req, res) {

    Vehicle.find(req.params.id, function(error, vehicle) {
        response.handle(res, { vehicle }, error);
    });
});

router.post("/", function(req, res) {

    Vehicle.create(req.token.id, req.body, function(error, id) {

        if (error) {
            response.internalError(res, error);
        } else {

            Vehicle.find(id, function(error, vehicle) {
                response.handle(res, { vehicle }, error);
            });
        }
    });
});

router.put("/:id", function(req, res) {

    var id = req.params.id;

    Vehicle.update(req.params.id, req.body, function(error) {

        if (error) {
            response.internalError(res, error);
        } else {

            Vehicle.find(id, function(error, vehicle) {
                response.handle(res, { vehicle }, error);
            });
        }
    });
});

router.delete("/:id", function(req, res) {

    Vehicle.remove(req.params.id, function(error) {
        response.handle(res, { "status": "Item deleted" }, error);
    });
});

router.get("/:vehicleId/fuel", function(req, res) {

    Fuel.findAll(req.params.vehicleId, function(error, fuel) {
        return response.handle(res, { fuel }, error);
    });
});

router.post("/:vehicleId/fuel", function(req, res) {

    Fuel.create(req.params.vehicleId, req.body, function(error, id) {

        if (error) {
            response.internalError(res, error);
        } else {

            Fuel.find(id, function(error, fuel) {
                response.handle(res, { fuel }, error);
            });
        }
    });
});

router.get("/:vehicleId/costs", function(req, res) {

    Cost.findAll(req.params.vehicleId, function(error, costs) {
        response.handle(res, { costs }, error);
    });
});

router.post("/:vehicleId/cost", function(req, res) {

    Cost.create(req.params.vehicleId, req.body, function(error, id) {

        if (error) {
            response.internalError(res, error);
        } else {

            Cost.find(id, function(error, cost) {
                response.handle(res, { cost }, error);
            });
        }
    });
});

module.exports = router;
