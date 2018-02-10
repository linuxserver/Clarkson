DELIMITER $$

CREATE PROCEDURE `Cost_GetById`
(
    in_id       VARCHAR(36)
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
        `id` = in_id;

END$$
