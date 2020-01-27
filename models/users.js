/*
This file handles the api services required to manipulate the "Student" table transactions using MySql
Services involves
1. Getting all Student details.
2. Getting Student details by Student Name

 */

var db = require("../dbconnection"); //reference of dbconnection.js

var User = {
  getAllUsers: function(callback) {
    db.connect(function(err) {
      if (err) {
        console.log(err.code);
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("SELECT * from Users", callback);

    return res;
  },

  getUserById: function(id, callback) {
    let res;

    db.connect(function(err) {
      if (err) {
        console.log(err.code);
        console.log("'Error connecting to Db'");
        return;
      }
    });

    res = db.query("select * from Users where usersID=?", [id], callback);

    return res;
  },

  getUserByType: function(id, callback) {
    let res;

    db.connect(function(err) {
      if (err) {
        console.log(err.code);
        console.log("'Error connecting to Db'");
        return;
      }
    });

    res = db.query("select * from Users where uType=?", [id], callback);

    return res;
  },

  getUserByUsername: function(name, callback) {
    let res;
    console.log(name);
    db.connect(function(err) {
      if (err) {
        console.log(err.code);
        console.log("'Error connecting to Db'");
        return;
      }
    });

    res = db.query(
      "select * from Users where userName LIKE ?",
      [name],
      callback
    );

    return res;
  },

  addNewUser: function(newUser, callback) {
    let maxId = 0;
    db.connect(function(err) {
      if (err) {
        console.log(err.code);
        console.log("'Error connecting to Db'");
      }
      return;
    });

    db.query("select max(usersID) AS maxId from Users", function(err, rows) {
      if (!err) {
        maxId = rows[0].maxId + 1;
        db.query(
          "Insert into Users values(?,?,?,?,?,?,?,?)",
          [
            maxId,
            newUser.userName,
            newUser.password,
            newUser.email,
            newUser.fName,
            newUser.lName,
            newUser.phone,
            newUser.uType
          ],
          callback
        );
      }
    });
  },

  updateUsersById: function(id, user, callback) {
    let res;
    db.connect(function(err) {
      if (err) {
        console.log(err.code);
        console.log("'Error connecting to Db'");
      }
      return;
    });

    res = db.query(
      "update Users set username=? , password=? , email = ?, fName = ? , lName = ?,phone = ? , utype=?  " +
        " where usersID=?",
      [
        user.userName,
        user.password,
        user.email,
        user.fName,
        user.lName,
        user.phone,
        user.uType,
        id
      ],
      callback
    );

    // db.end();
    return res;
  },

  deleteUser: function(id, callback) {
    db.connect(function(err) {
      if (err) {
        console.log(err.code);
        console.log("'Error connecting to Db'");
      }
      return;
    });

    let res = db.query("delete from Users where usersID=?", [id], callback);
    // db.end();
    return res;
  }
};

module.exports = User;
