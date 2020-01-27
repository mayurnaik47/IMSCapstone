//Database connections details MySql.

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "students",
  database: "imsdb"
});

connection.on("error", function(err) {
  console.log(err.code);
});

module.exports = connection;
