var express = require("express"),
    app     = express(),
    path    = require("path"),
    morgan  = require("morgan"),
    db      = require("./server/db/mysql"),
    config  = require("./server/config"),
    auth    = require("./server/security/auth");

app.use(require("helmet")());
app.use(require("body-parser").json());
app.use(require("cors")());
app.use(morgan("combined", {
    skip: function(req, res) {
        return res.statusCode < 400;
    }
}));

app.use(express.static(path.join(__dirname, 'dist')));

// Unauthenticated endpoint used for checking user credentials
app.use(config.baseURI + "/api/auth", require("./server/routes/auth"));
app.use(config.baseURI + "/api/units", require("./server/routes/units"));
app.use(config.baseURI + "/api/ping", require("./server/routes/ping"));

// User endpoint contains a mix of authenticated and unauthenticated endpoints
app.use(config.baseURI + "/api/user", require("./server/routes/user"));

// All authenticated endpoints - user must provide a valid JWT in the header
app.use(config.baseURI + "/api/vehicle", auth.verify, require("./server/routes/vehicle"));
app.use(config.baseURI + "/api/fuel", auth.verify, require("./server/routes/fuel"));
app.use(config.baseURI + "/api/cost", auth.verify, require("./server/routes/cost"));
app.use(config.baseURI + "/api/dashboard", auth.verify, require("./server/routes/dashboard"));

// Serve the main web app
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

db.connect(function(err) {

    if (err) {
        throw err;
    } else {
        module.exports = app.listen(config.port);
    }
});
