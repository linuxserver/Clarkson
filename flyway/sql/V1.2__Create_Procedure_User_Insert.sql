DELIMITER $$

CREATE PROCEDURE `User_Insert`
(
    in_id          VARCHAR(36),
    in_email       VARCHAR(100),
    in_username    VARCHAR(100),
    in_password    VARCHAR(200)
)
BEGIN

    DECLARE userCount   INT(11);
    DECLARE isAdmin     TINYINT(1);

    SELECT COUNT(`id`) INTO userCount FROM `Users`;

    IF userCount = 0 THEN
        SET isAdmin = 1;
    ELSE
        SET isAdmin = 0;
    END IF;

    INSERT INTO `Users`
    (
        `id`,
        `email`,
        `username`,
        `password`,
        `admin`,
        `fuelUnit`,
        `distanceUnit`,
        `fuelConsumptionUnit`,
        `currencyUnit`
    )
    VALUES
    (
        in_id,
        in_email,
        in_username,
        in_password,
        isAdmin,
        1,
        1,
        1,
        1
    );

END$$
