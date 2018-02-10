DELIMITER $$

CREATE PROCEDURE `Fuel_GetByVehicle`
(
    in_vehicle  VARCHAR(36)
)
BEGIN

    SET @tripDistance = 0;

    SELECT
       `id`,
       `vehicle`,
        DATE_FORMAT(`date`, '%Y-%m-%dT%H:%i:%s') AS `date`,
        `fuelAmount`,
        `totalCost`,
        `fuelUnitCost`,
        `locationLatitude`,
        `locationLongitude`,
        `odometerReading` - @tripDistance AS `tripDistance`,
        @tripDistance := `odometerReading` AS `odometerReading`,
        `notes`,
        `fullTank`,
        `missedFillUp`
    FROM
        `Fuel`
    WHERE
        `vehicle` = in_vehicle
    ORDER BY
        `date` ASC;

END$$
