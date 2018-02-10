var Router      = require("express").Router,
    router      = new Router(),
    response    = require("../response"),
    Cost        = require("../model/cost");

router.get("/:id", function(req, res) {

    Cost.find(req.params.id, function(error, cost) {
        response.handle(res, { cost }, error);
    });
});

router.put("/:id", function(req, res) {

    var id = req.params.id;

    Cost.update(id, req.body, function(error) {

        if (error) {
            response.internalError(res, error);
        } else {

            Cost.find(id, function(error, cost) {
                response.handle(res, { cost }, error);
            });
        }
    });
});

router.delete("/:id", function(req, res) {

    Cost.remove(req.params.id, function(error) {
        response.handle(res, { "status": "Item deleted" }, error);
    });
});

module.exports = router;
