DELIMITER $$

CREATE PROCEDURE `Cost_UpdateById`
(
    in_id            VARCHAR(36),
    in_date          DATETIME,
    in_costType      VARCHAR(20),
    in_totalCost     DECIMAL(6,2),
    in_invoice       VARCHAR(100),
    in_notes         TEXT
)
BEGIN

    UPDATE
        `Costs`
    SET
        `date` = in_date,
        `costType` = in_costType,
        `totalCost` = in_totalCost,
        `invoice` = in_invoice,
        `notes` = in_notes
    WHERE
        `id` = in_id;

END$$
