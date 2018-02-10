DELIMITER $$

CREATE PROCEDURE `Vehicle_UpdateById`
(
    in_id                    VARCHAR(36),
    in_name                  VARCHAR(100),
    in_registration          VARCHAR(20),
    in_make                  VARCHAR(100),
    in_model                 VARCHAR(100),
    in_picture               VARCHAR(100),
    in_yearOfManufacture     INT(11),
    in_vin                   VARCHAR(100),
    in_engineSizeCC          INT(11),
    in_fuelType              INT(11)
)
BEGIN

    UPDATE
        `Vehicles`
    SET
        `name` = in_name,
        `registration` = in_registration,
        `make` = in_make,
        `model` = in_model,
        `picture` = in_picture,
        `yearOfManufacture` = in_yearOfManufacture,
        `vin` = in_vin,
        `engineSizeCC` = in_engineSizeCC,
        `fuelType` = in_fuelType
    WHERE
        `id` = in_id;

END$$
