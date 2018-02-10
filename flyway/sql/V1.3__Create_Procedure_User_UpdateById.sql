DELIMITER $$

CREATE PROCEDURE `User_UpdateById`
(
    in_id          VARCHAR(36),
    in_email       VARCHAR(100),
    in_username    VARCHAR(100)
)
BEGIN

    UPDATE
        `Users`
    SET
        `email` = in_email,
        `username` = in_username
    WHERE
        `id` = in_id;

END$$
