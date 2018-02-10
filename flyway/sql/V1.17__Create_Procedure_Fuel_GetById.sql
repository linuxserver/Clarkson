DELIMITER $$

CREATE PROCEDURE `Fuel_GetById`
(
    in_id       VARCHAR(36)
)
BEGIN

    SELECT
        `id`,
        `vehicle`,
        DATE_FORMAT(`date`, '%Y-%m-%dT%H:%i:%s') AS `date`,
        `fuelAmount`,
        `totalCost`,
        `fuelUnitCost`,
        `locationLatitude`,
        `locationLongitude`,
        `odometerReading`,
        `notes`,
        `fullTank`,
        `missedFillUp`
    FROM
        `Fuel`
    WHERE
        `id` = in_id;

END$$
