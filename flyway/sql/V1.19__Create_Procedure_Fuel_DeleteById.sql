DELIMITER $$

CREATE PROCEDURE `Fuel_DeleteById`
(
    in_id  VARCHAR(36)
)
BEGIN

    DELETE
        F
    FROM
        `Fuel` AS F
    WHERE
        F.`id` = in_id;

END$$
