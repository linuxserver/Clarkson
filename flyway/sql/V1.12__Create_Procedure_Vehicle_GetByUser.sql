DELIMITER $$

CREATE PROCEDURE `Vehicle_GetByUser`
(
    in_user VARCHAR(36)
)
BEGIN

    SELECT
        *
    FROM
        `Vehicles`
    WHERE
        `user` = in_user;

END$$
