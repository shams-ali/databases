CREATE DATABASE chat;

USE chat;


CREATE TABLE Rooms (
  /* Describe your table here.*/
  id INTEGER NOT NULL PRIMARY KEY,
  name CHAR(20) NOT NULL
);
CREATE TABLE Users (
  /* Describe your table here.*/
  id INTEGER NOT NULL PRIMARY KEY,
  name CHAR(20) NOT NULL
);
CREATE TABLE Messages (
  /* Describe your table here.*/
  id INTEGER PRIMARY KEY,
  message CHAR(140) NOT NULL,
  user_id INTEGER NOT NULL,
  room_id INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES Users(id),/*add fk user_id*/
  FOREIGN KEY(room_id) REFERENCES Rooms(id)/*add fk room_id*/
);



/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

