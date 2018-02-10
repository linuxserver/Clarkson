DELIMITER $$

CREATE PROCEDURE `Vehicle_Insert`
(
    in_vehicleId             VARCHAR(36),
    in_user                  VARCHAR(36),
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

    INSERT INTO `Vehicles`
    (
        `id`,
        `user`,
        `name`,
        `registration`,
        `make`,
        `model`,
        `picture`,
        `yearOfManufacture`,
        `vin`,
        `engineSizeCC`,
        `fuelType`
    )
    VALUES
    (
        in_vehicleId,
        in_user,
        in_name,
        in_registration,
        in_make,
        in_model,
        in_picture,
        in_yearOfManufacture,
        in_vin,
        in_engineSizeCC,
        in_fuelType
    );

END$$
