DELIMITER $$

CREATE PROCEDURE `User_UpdatePreferencesById`
(
    in_id                   VARCHAR(36),
    in_fuelUnit             INT(11),
    in_fuelConsumptionUnit  INT(11),
    in_distanceUnit         INT(11),
    in_currencyUnit         INT(11)
)
BEGIN

    UPDATE
        `Users`
    SET
        `fuelUnit`              = in_fuelUnit,
        `fuelConsumptionUnit`   = in_fuelConsumptionUnit,
        `distanceUnit`          = in_distanceUnit,
        `currencyUnit`          = in_currencyUnit
    WHERE
        `id` = in_id;

END$$
