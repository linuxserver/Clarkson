var express = require("express"),
    app = express(),
    path = require("path"),
    morgan = require("morgan"),
    db = require("./server/db/mysql"),
    auth = require("./server/security/auth");

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
app.use("/api/auth", require("./server/routes/auth"));
app.use("/api/units", require("./server/routes/units"));
app.use("/api/ping", require("./server/routes/ping"));

// User endpoint contains a mix of authenticated and unauthenticated endpoints
app.use("/api/user", require("./server/routes/user"));

// All authenticated endpoints - user must provide a valid JWT in the header
app.use("/api/vehicle", auth.verify, require("./server/routes/vehicle"));
app.use("/api/fuel", auth.verify, require("./server/routes/fuel"));
app.use("/api/cost", auth.verify, require("./server/routes/cost"));
app.use("/api/dashboard", auth.verify, require("./server/routes/dashboard"));

// Serve the main web app
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

db.connect(function(err) {

    if (err) {
        throw err;
    } else {
        module.exports = app.listen(3000);
    }
});
