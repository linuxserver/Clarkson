DELIMITER $$

CREATE PROCEDURE `User_GetByUsername`
(
    in_username VARCHAR(100)
)
BEGIN

    SELECT
        U.`id`,
        U.`email`,
        U.`username`,
        U.`password`,
        U.`admin`,
        U.`fuelUnit`            AS `fuelUnitId`,
        FU.`unit` 		        AS `fuelUnit`,
        FU.`unitName` 	        AS `fuelUnitName`,
        U.`distanceUnit`        AS `distanceUnitId`,
        DU.`unit` 		        AS `distanceUnit`,
        DU.`unitName` 	        AS `distanceUnitName`,
        U.`fuelConsumptionUnit` AS `fuelConsumptionUnitId`,
        FCU.`unit` 		        AS `fuelConsumptionUnit`,
        FCU.`unitName`          AS `fuelConsumptionUnitName`,
        U.`currencyUnit`        AS `currencyUnitId`,
        CU.`unit`               AS `currencyUnit`,
        CU.`unitName`           AS `currencyUnitName`,
        CU.`symbol`             AS `currencyUnitSymbol`
    FROM
        `Users` U
    INNER JOIN
        `DistanceUnits` DU ON U.`distanceUnit` = DU.`id`
    INNER JOIN
        `FuelUnits` FU ON U.`fuelUnit` = FU.`id`
    INNER JOIN
        `FuelConsumptionUnits` FCU ON U.`fuelConsumptionUnit` = FCU.`id`
    INNER JOIN
        `CurrencyUnits` CU ON U.`currencyUnit` = CU.`id`
    WHERE
        U.`username` = in_username;

END$$
