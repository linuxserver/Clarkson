var Router      = require("express").Router,
    router      = new Router(),
    response    = require("../response");

// Models
var fuelUnit            = require("../model/fuelUnit"),
    fuelConsumptionUnit = require("../model/fuelConsumptionUnit"),
    distanceUnit        = require("../model/distanceUnit"),
    currencyUnit        = require("../model/currencyUnit"),
    fuelType            = require("../model/fuelType");

router.get("/fuelUnits", function(req, res) {

    fuelUnit.findAll(function(error, fuelUnits) {
        response.handle(res, { fuelUnits }, error);
    });
});

router.get("/fuelTypes", function(req, res) {

    fuelType.findAll(function(error, fuelTypes) {
        response.handle(res, { fuelTypes }, error);
    });
});

router.get("/fuelConsumptionUnits", function(req, res) {

    fuelConsumptionUnit.findAll(function(error, fuelConsumptionUnits) {
        response.handle(res, { fuelConsumptionUnits }, error);
    });
});

router.get("/distanceUnits", function(req, res) {

    distanceUnit.findAll(function(error, distanceUnits) {
        response.handle(res, { distanceUnits }, error);
    });
});

router.get("/currencyUnits", function(req, res) {

    currencyUnit.findAll(function(error, currencyUnits) {
        response.handle(res, { currencyUnits }, error);
    });
});

module.exports = router;
