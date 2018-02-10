DELIMITER $$

CREATE PROCEDURE `Cost_Insert`
(
    in_id            VARCHAR(36),
    in_vehicle       VARCHAR(36),
    in_date          DATETIME,
    in_costType      VARCHAR(20),
    in_totalCost     DECIMAL(6,2),
    in_invoice       VARCHAR(100),
    in_notes         TEXT
)
BEGIN

    INSERT INTO `Costs`
    (
        `id`,
        `vehicle`,
        `date`,
        `costType`,
        `totalCost`,
        `invoice`,
        `notes`
    )
    VALUES
    (
        in_id,
        in_vehicle,
        in_date,
        in_costType,
        in_totalCost,
        in_invoice,
        in_notes
    );

END$$
