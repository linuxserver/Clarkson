DELIMITER $$

CREATE PROCEDURE `User_UpdatePasswordById`
(
    in_id          VARCHAR(36),
    in_password    VARCHAR(200)
)
BEGIN

    UPDATE
        `Users`
    SET
        `password` = in_password
    WHERE
        `id` = in_id;

END$$
