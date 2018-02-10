DELIMITER $$

CREATE PROCEDURE `Fuel_Insert`
(
    in_id                    VARCHAR(36),
    in_vehicle               VARCHAR(36),
    in_date                  DATETIME,
    in_fuelAmount            DECIMAL(5,2),
    in_totalCost             DECIMAL(5,2),
    in_fuelUnitCost          DECIMAL(5,2),
    in_locationLatitude      DECIMAL(10,8),
    in_locationLongitude     DECIMAL(11,8),
    in_odometerReading       INT(11),
    in_notes                 TEXT,
    in_fullTank              TINYINT(1),
    in_missedFillUp          TINYINT(1)
)
BEGIN

    INSERT INTO `Fuel`
    (
        `id`,
        `vehicle`,
        `date`,
        `fuelAmount`,
        `totalCost`,
        `fuelUnitCost`,
        `locationLatitude`,
        `locationLongitude`,
        `odometerReading`,
        `notes`,
        `fullTank`,
        `missedFillUp`
    )
    VALUES
    (
        in_id,
        in_vehicle,
        in_date,
        in_fuelAmount,
        in_totalCost,
        in_fuelUnitCost,
        in_locationLatitude,
        in_locationLongitude,
        in_odometerReading,
        in_notes,
        in_fullTank,
        in_missedFillUp
    );

END$$
