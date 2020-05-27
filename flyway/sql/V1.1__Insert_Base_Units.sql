INSERT INTO `FuelUnits` (`id`, `unit`, `unitName`) VALUES (1, "l", "Litres");
INSERT INTO `FuelUnits` (`id`, `unit`, `unitName`) VALUES (2, "gal", "Gallon");
INSERT INTO `FuelUnits` (`id`, `unit`, `unitName`) VALUES (3, "gal (US)", "US Gallon");

INSERT INTO `FuelTypes` (`id`, `type`) VALUES (1, "Petrol");
INSERT INTO `FuelTypes` (`id`, `type`) VALUES (2, "Diesel");
INSERT INTO `FuelTypes` (`id`, `type`) VALUES (3, "Ethanol");
INSERT INTO `FuelTypes` (`id`, `type`) VALUES (4, "LPG");

INSERT INTO `DistanceUnits` (`id`, `unit`, `unitName`) VALUES (1, "mi", "Miles");
INSERT INTO `DistanceUnits` (`id`, `unit`, `unitName`) VALUES (2, "km", "Kilometres");

INSERT INTO `CurrencyUnits` (`id`, `unit`, `unitName`, `symbol`) VALUES (1, "GBP", "Pound Sterling", "&#163;");
INSERT INTO `CurrencyUnits` (`id`, `unit`, `unitName`, `symbol`) VALUES (2, "USD", "United States Dollar", "&#36;");
INSERT INTO `CurrencyUnits` (`id`, `unit`, `unitName`, `symbol`) VALUES (3, "EUR", "Euro", "&#128;");
INSERT INTO `CurrencyUnits` (`id`, `unit`, `unitName`, `symbol`) VALUES (4, "AUD", "Australian Dollar", "AU&#36;");
INSERT INTO `CurrencyUnits` (`id`, `unit`, `unitName`, `symbol`) VALUES (5, "CAD", "Canadian Dollar", "CA&#36;");

INSERT INTO `FuelConsumptionUnits` (`id`, `unit`, `unitName`) VALUES (1, "mpg", "Miles per Gallon");
INSERT INTO `FuelConsumptionUnits` (`id`, `unit`, `unitName`) VALUES (2, "l/100km", "Litres per 100 Kilometers");
INSERT INTO `FuelConsumptionUnits` (`id`, `unit`, `unitName`) VALUES (3, 'mpg (Imperial)', 'Miles per Gallon');
