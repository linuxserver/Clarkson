DELIMITER $$

CREATE PROCEDURE `Cost_GetByVehicle`
(
    in_vehicle  VARCHAR(36)
)
BEGIN

    SELECT
       `id`,
       DATE_FORMAT(`date`, '%Y-%m-%d %H:%i:%s') AS `date`,
       `costType`,
       `totalCost`,
       `invoice`,
       `notes`
   FROM
       `Costs`
    WHERE
        `vehicle` = in_vehicle;

END$$
