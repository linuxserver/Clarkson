DELIMITER $$

CREATE PROCEDURE `Dashboard_GetTopStats`
(
    in_id VARCHAR(36)
)
BEGIN

    SELECT
        MAX(F.`odometerReading`) - MIN(F.`odometerReading`) AS `totalDistance`,
        COUNT(F.`id`)                                       AS `totalFillUps`,
        SUM(F.`totalCost`)                                  AS `totalSpent`
    FROM
        `Users` U
    INNER JOIN
        `Vehicles` V ON V.`user` = U.`id`
    INNER JOIN
        `Fuel` F ON F.`vehicle` = V.`id`
    WHERE
        U.`id` = in_id
    GROUP BY
        V.`id`;

END$$
