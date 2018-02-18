DELIMITER $$

CREATE PROCEDURE `Dashboard_GetMonthlyFuelCosts`
(
    in_id VARCHAR(36)
)
BEGIN

    SELECT
        V.`name` AS `vehicle`,
        MONTH(F.`date`)		AS `month`,
        YEAR(F.`date`) 		AS `year`,
        SUM(F.`totalCost`) 	AS `totalCost`
    FROM
        `Users` U
    INNER JOIN
        `Vehicles` V ON V.`user` = U.`id`
    INNER JOIN
        `Fuel` F ON F.`vehicle` = V.`id`
    WHERE
        U.`id` = in_id
    GROUP BY
        V.`name`,
        MONTH(F.`date`),
        YEAR(F.`date`);

END$$
