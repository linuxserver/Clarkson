DELIMITER $$

CREATE PROCEDURE `Vehicle_GetById`
(
    in_id VARCHAR(36)
)
BEGIN

    SELECT
        *
    FROM
        `Vehicles`
    WHERE
        `id` = in_id;

END$$
