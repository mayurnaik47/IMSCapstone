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
   }
  //
  // addNewComment:function(public,callback){
  //
  //   let maxId = 0;
  //   db.connect(function (err) {
  //     if(err) {console.log(err.code)
  //       console.log("'Error connecting to Db'")};
  //     return;
  //   });
  //
  //   db.query("Insert into PublicComment values(?,?,?)",[public,newIdea.title,newIdea.description,newIdea.estTime,newIdea.cost,newIdea.docName,
  //         newIdea.usersID,newIdea.typeID,1],callback);
  //     }
  //
  // }
};

module.exports=PublicMessage;



