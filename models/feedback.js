/*
This file handles the api services required to manipulate the "Student" table transactions using MySql
Services involves
1. Getting all Student details.
2. Getting Student details by Student Name

 */

let db=require('../dbconnection'); //reference of dbconnection.js

let Feedback= {

  addNewMessage: function(newIdeaFeeback,callback){

    db.connect(function (err) {
      if(err) {console.log(err.code)
        console.log("'Error connecting to Db'")};
      return;
    });
    let maxMsgId = 0;

    let res = db.beginTransaction(function (err) {



      if (err) {
        console.log(err.code);
      }

      db.query('insert into messages(message) values(?)' , [newIdeaFeeback.message], function (err, result) {

        if (err) {
          db.rollback(function () {
            throw err;
          });
        }


        db.query("select max(msgID) AS maxID from messages", [],function (err, resultrows) {
          if (err) {
            db.rollback(function () {
              throw err;
            });
          }

          maxMsgId = 0;
          maxMsgId = resultrows[0].maxID;
          console.log("select "+" "+resultrows[0]+" "+resultrows[0].maxID);

          db.query("Insert into IdeaFeedback values(?,?,?)", [newIdeaFeeback.usersID, newIdeaFeeback.ideaID, maxMsgId], function (err, result) {
            if (err) {
              console.log("error");
              db.rollback(function () {
                throw err;
              });
            }

            db.commit(function (err) {
              if (err) {
                db.rollback(function () {
                  throw err;
                });
              }

              console.log('Transaction Complete.');

              // End transaction
            });
          });
        });
      });

  });
    console.log("select ends");
    return newIdeaFeeback;

  },

  getAllFeedbackbyId: function(id,callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    console.log(id);

    let res = db.query("SELECT * from IdeaFeedback where ideaID=?",[id],callback);

    return res;
  },

  getIdeaById: function(idType, id, callback) {

    let res;

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    if(idType=="ideaID")
      res = db.query("select * from Idea where ideaID=?",[id],callback);
    else if(idType=="usersID"){
      console.log(idType+' '+id);
      res = db.query("select * from Idea where usersID=?",[id],callback);}
    else if(idType=="typeID")
      res = db.query("select * from Idea where typeID=?",[id],callback);
    else if(idType=="statusID")
      res = db.query("select * from Idea where statusID=?",[id],callback);

    return res;
  }
};

module.exports=Feedback;
