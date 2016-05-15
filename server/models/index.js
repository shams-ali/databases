var db = require('../db');



var POST2 = 'insert into Rooms (name) values ("newroom")';

var postMessage = 'insert into Messages (message, user_id, room_id) VALUES ("${message}", SELECT(id from Users where name="$(username)"), SELECT(id from Rooms where name="$(roomname)"))';

module.exports = {
  messages: {
    get: function (req, cb) {
      var reultsObject = {results: []};
      const allMessages = `
        SELECT *
        FROM Messages
      `;
      const allUsers = `
        SELECT *
        FROM Users
      `;
      const allRooms = `
        SELECT *
        FROM Rooms
      `;

    }, // a function which produces all the messages


    post: function ({message, username, roomname} = {}, cb) {
      validate(roomname);
      console.log('message in post is: ', message);
      console.log('username in post is: ', username);
      console.log('roomname in post is: ', roomname);
      const userQuery = `
        SELECT id
        FROM Users
        WHERE name="${username}"
      `;
      const roomQuery = `
      SELECT id
      FROM Rooms
      WHERE name="${roomname}"
      `;



      // console.log('userQuery is: ', userQuery);
      // console.log('roomQuery is: ', roomQuery);
      db.query(userQuery, (error, userRows) => {
        console.log('userRows in message post is: ', userRows);
        if (error) {
          cb(error);
        }
        db.query(roomQuery, (error, roomRows) => {
          console.log('roomRows in message post is: ', roomRows);
          if (error) {
            cb(error);
          }
          const insertQuery = `
            INSERT INTO Messages (message, user_id, room_id)
            VALUES ("${message}", ${userRows[0].id}, ${roomRows[0].id})
            `;
          db.query(insertQuery, cb);
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    //
    get: function () {

    },
    post: function (username, cb) {
      const userQuery = `
        SELECT id
        FROM Users
        WHERE name="${username}"
      `;

      db.query(userQuery, (error, userRows) => {
        console.log('userRows in users post is: ', userRows);
        if (error) {
          cb(error);
        }
        console.log('userRows.length in users post is: ', userRows.length);
        if (userRows.length === 0) {
          const insertQuery = `
              INSERT INTO Users (name)
              VALUES ("${username}")
            `;
          db.query(insertQuery, cb);
        }
      });
    }
  }
};
//helper functions
var validate = function (roomname) {
  console.log('roomname in validate is: ', roomname);

  const roomQuery = `
    SELECT id
    FROM Rooms
    WHERE name="${roomname}"
  `;

  db.query(roomQuery, (error, roomRows) => {
    console.log('roomRows in validate is: ', roomRows);
    if (error) {
      console.log('error in validate userQuery is: ', err);
    }
    if (roomRows.length === 0) {
      const insertQuery = `
        INSERT INTO Rooms (name)
        VALUES ("${roomname}")
      `;
      db.query(insertQuery);
    }
  });
};
