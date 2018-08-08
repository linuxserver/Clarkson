DELIMITER $$

CREATE PROCEDURE `User_PromoteById`
(
    in_userId VARCHAR(36)
)
BEGIN

    UPDATE 
        `Users` 
    SET 
        `admin` = 1 
    WHERE 
        `id` = in_userId;

END$$
