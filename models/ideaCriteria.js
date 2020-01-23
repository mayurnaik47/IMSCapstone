/*
This file handles the api services required to manipulate the "Student" table transactions using MySql
Services involves
1. Getting all Student details.
2. Getting Student details by Student Name

 */

var db=require('../dbconnection'); //reference of dbconnection.js

var IdeaCriteria= {

  getAllCriteria: function(callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("SELECT * from IdeaCriteria",callback);

    return res;
  },
  getAllCriteriaForEvalIdAndUserId: function(phase,isActive,callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });


    let res = db.query("SELECT ic.name, ic.critID from IdeaCriteria ic  where  ic.phase=? and ic.isActive = ?",[phase,isActive],callback);

    return res;
  },

  getIdeaPhaseCriteria: function(phase, callback){

    db.connect(function (err) {
      if(err) {


        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("SELECT ic.name, ic.critID from IdeaCriteria ic  where ic.phase=? and ic.isActive = '1'",[phase],callback);

    return res;
  },

  getIdeaCommentsForIdeaID: function(userID, callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("SELECT id.usersID, ms.message from IdeaFeedback id INNER JOIN messages ms using(msgID) where id.ideaID =?",[userID],callback);

    return res;
  },

  addNewCriteria:function(newCriteria,callback) {

    let maxId = 0;
    db.connect(function (err) {
      if (err) {
        console.log(err.code);
        console.log("'Error connecting to Db'");
        return;
      }

    });

    db.query("select max(critID) AS maxId from IdeaCriteria ", function (err, rows) {

      if (!err) {
        maxId = rows[0].maxId + 1;
        db.query("Insert into IdeaCriteria values(?,?,?,?)", [maxId, newCriteria.name,newCriteria.phase,newCriteria.isActive], callback);
      }
    });
  },

  updateCriteria: function(id,ideaCrit,callback){


    db.connect(function (err) {
      if(err) {console.log(err.code)
        console.log("'Error connecting to Db'")};
      return;
    });

     let res = db.query("update IdeaCriteria set  name=? , phase=? , isActive = ?  " +
        " where critID=?",[ideaCrit.name, ideaCrit.phase, ideaCrit.isActive,id],callback);


    return res;
  }

};

module.exports=IdeaCriteria;

