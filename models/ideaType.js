/*
This file handles the api services required to manipulate the "Student" table transactions using MySql
Services involves
1. Getting all Student details.
2. Getting Student details by Student Name

 */

var db=require('../dbconnection'); //reference of dbconnection.js

var IdeaType= {

  getAllTypes: function(callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("SELECT * from Type",callback);

    return res;
  },

  getTypeById: function(id, callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("SELECT * from Type  where typeID =?",[id], callback);

    return res;
  },

  deleteType: function(id,callback){

    db.connect(function (err) {
      if(err) {console.log(err.code)
        console.log("'Error connecting to Db'")};
      return;
    });

    console.log("inter"+ id);
    let res = db.query("delete from Type where typeID = ?",[id],callback);
    // db.end();
    return res;

  },

  addNewType:function(newType,callback) {

    let maxId = 0;
    db.connect(function (err) {
      if (err) {
        console.log(err.code);
        console.log("'Error connecting to Db'");
        return;
      }

    });

    db.query("select max(typeID) AS maxId from Type ", function (err, rows) {

      if (!err) {
        maxId = rows[0].maxId + 1;
        db.query("Insert into Type values(?,?)", [maxId, newType.name], callback);
      }
    });
  }

  };

module.exports=IdeaType;

