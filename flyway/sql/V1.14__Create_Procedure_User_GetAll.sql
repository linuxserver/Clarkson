DELIMITER $$

CREATE PROCEDURE `User_GetAll` ()
BEGIN

    SELECT
        *
    FROM
        `Users`;

END$$
