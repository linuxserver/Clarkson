DELIMITER $$

CREATE PROCEDURE `Vehicle_DeleteById`
(
    in_vehicleId VARCHAR(36)
)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 1 AS `status`;
    END;

    START TRANSACTION;

        DELETE
            F
        FROM
            `Fuel` AS F
        WHERE
            F.`vehicle` = in_vehicleId;

        DELETE
            C
        FROM
            `Costs` AS C
        WHERE
            C.`vehicle` = in_vehicleId;

        DELETE
            V
        FROM
            `Vehicles` AS V
        WHERE
            V.`id` = in_vehicleId;

        SELECT 0 AS `status`;

    COMMIT;

END$$
