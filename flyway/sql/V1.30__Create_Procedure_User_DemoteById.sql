DELIMITER $$

CREATE PROCEDURE `User_DemoteById`
(
    in_userId VARCHAR(36)
)
BEGIN

    UPDATE 
        `Users` 
    SET 
        `admin` = 0 
    WHERE 
        `id` = in_userId;

END$$
