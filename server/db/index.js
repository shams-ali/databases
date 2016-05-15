var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: 'ismaili1',
  database: 'chat',
  host: 'localhost'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connection: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
//
module.exports = connection;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
