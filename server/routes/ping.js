var Router      = require("express").Router,
    router      = new Router();

router.get("/", function(req, res) {
    res.json({ status: "pong" });
});

module.exports = router;
