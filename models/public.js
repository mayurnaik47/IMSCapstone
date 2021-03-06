/*
This file handles the api services required to manipulate the "Student" table transactions using MySql
Services involves
1. Getting all Student details.
2. Getting Student details by Student Name

 */

var db=require('../dbconnection'); //reference of dbconnection.js

var PublicMessage= {

  getAllMessages: function(callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("SELECT * from PublicComment",callback);

    return res;
  },

  getPhaseState: function(callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("SELECT * from Phase",callback);

    return res;
  },

  updatePhase: function(phaseid,action,callback){

    let res;
    db.connect(function (err) {
      if(err) {console.log(err.code)
        console.log("'Error connecting to Db'")};
      return;
    });

      res = db.query("update Phase set  phase=? , action=?",[phaseid, action],callback);

    // db.end();
    return res;
  }

};

module.exports=PublicMessage;



