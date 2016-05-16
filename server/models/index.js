var db = require('../db');
var Promise = require('bluebird');
Promise.promisifyAll(db);

module.exports = {
  messages: {
    get: function () {
      return db.queryAsync('SELECT * FROM Messages').then((r)=>r);

    }, // a function which produces all the messages
    post: function (message, username, roomname) {
      db.queryAsync(`SELECT id FROM Rooms WHERE name="${roomname}"`).then((roomRows) => {
        if (roomRows.length === 0) {
          db.queryAsync(`INSERT INTO Rooms (name) VALUES ("${roomname}")`);
        }
      }).then(() => db.queryAsync(`INSERT INTO Messages (message, user_id, room_id) VALUES ("${message}", (SELECT id from Users where name="${username}"), (SELECT id from Rooms where name="${roomname}")`).then((r) => r));
    }
    // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    //
    get: function () {
      return db.queryAsync('SELECT * FROM Users').then((r) => r);
    },
    post: function (username) {
      return db.queryAsync(`INSERT INTO Users (name) VALUES ('${username}')`).then((r) => {
        console.log('user created: ', username);
        return r;
      });
    }
  }
};
//helper functions
