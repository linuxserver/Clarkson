DELIMITER $$

CREATE PROCEDURE `User_ClearById`
(
    in_userId VARCHAR(36)
)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 1 AS `status`;
    END;

    START TRANSACTION;

        DELETE
            C
        FROM
            `Costs` AS C
        INNER JOIN
            `Vehicles` AS V ON V.`id` = C.`vehicle`
        WHERE
            V.`user` = in_userId;

        DELETE
            F
        FROM
            `Fuel` AS F
        INNER JOIN
            `Vehicles` AS V ON V.`id` = F.`vehicle`
        WHERE
            V.`user` = in_userId;

        DELETE
            V
        FROM
            `Vehicles` AS V
        WHERE
            V.`user`= in_userId;

        SELECT 0 AS `status`;

    COMMIT;

END$$
