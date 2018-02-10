DELIMITER $$

CREATE PROCEDURE `Fuel_UpdateById`
(
    in_id                   VARCHAR(36),
    in_date                 DATETIME,
    in_fuelAmount           DECIMAL(5,2),
    in_totalCost            DECIMAL(5,2),
    in_fuelUnitCost         DECIMAL(5,2),
    in_locationLatitude     DECIMAL(10,8),
    in_locationLongitude    DECIMAL(11,8),
    in_odometerReading      INT(11),
    in_notes                TEXT,
    in_fullTank             TINYINT(1),
    in_missedFillUp         TINYINT(1)
)
BEGIN

    UPDATE
        `Fuel`
    SET
        `date` = in_date,
        `fuelAmount` = in_fuelAmount,
        `totalCost` = in_totalCost,
        `fuelUnitCost` = in_fuelUnitCost,
        `locationLatitude` = in_locationLatitude,
        `locationLongitude` = in_locationLongitude,
        `odometerReading` = in_odometerReading,
        `notes` = in_notes,
        `fullTank` = in_fullTank,
        `missedFillUp` = in_missedFillUp
    WHERE
        `id` = in_id;

END$$
