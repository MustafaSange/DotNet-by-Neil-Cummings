-- FETCH
SELECT * FROM Users;


-- INSERT
INSERT INTO Users (Id, UserName)
VALUES (1, "Bob");

INSERT INTO Users (Id, UserName)
VALUES (2, "Tom");

INSERT INTO Users (Id, UserName)
VALUES (3, "Jane");


-- DELETE
DELETE FROM Users WHERE UserName = "";