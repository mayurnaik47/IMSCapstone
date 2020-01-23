/*
This file handles the api services required to manipulate the "Student" table transactions using MySql
Services involves
1. Getting all Student details.
2. Getting Student details by Student Name

 */

var db=require('../dbconnection'); //reference of dbconnection.js

var IdeaStatus= {

  getAllStatus: function(callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("SELECT * from Status",callback);

    return res;
  },

  getStatusById: function(id, callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("SELECT * from Status  where statusID =?",[id], callback);

    return res;
  }


};

module.exports=IdeaStatus;

