DELIMITER $$

CREATE PROCEDURE `Cost_DeleteById`
(
    in_id  VARCHAR(36)
)
BEGIN

    DELETE
        C
    FROM
        `Costs` AS C
    WHERE
        C.`id` = in_id;

END$$
