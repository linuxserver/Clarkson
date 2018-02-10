var Router      = require("express").Router,
    router      = new Router(),
    response    = require("../response"),
    Fuel        = require("../model/fuel"),
    User        = require("../model/user");

router.get("/:id", function(req, res) {

    Fuel.find(req.params.id, function(error, fuel) {

        if (error) {
            return response.internalError(res, error);
        }

        return response.handle(res, { fuel }, error);
    });
});

router.put("/:id", function(req, res) {

    var id = req.params.id;

    Fuel.update(id, req.body, function(error) {

        if (error) {
            response.internalError(res, error);
        } else {

            Fuel.find(id, function(error, fuel) {
                response.handle(res, { "fuel": fuel }, error);
            });
        }
    });
});

router.delete("/:id", function(req, res) {

    Fuel.remove(req.params.id, function(error) {
        response.handle(res, { "status": "Item deleted" }, error);
    });
});

module.exports = router;
