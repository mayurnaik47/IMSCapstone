/*
This file handles the api services required to manipulate the "Student" table transactions using MySql
Services involves
1. Getting all Student details.
2. Getting Student details by Student Name

 */

var db=require('../dbconnection'); //reference of dbconnection.js

var Idea= {

  getAllIdeas: function(callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("SELECT ie.statusID, ie.typeID, ie.ideaID, ie.title, ie.description, ie.estTime, ie.cost, ie.docName,  " +
      "ie.usersID, tp.name AS  typeName, st.name AS statusName from Idea ie LEFT OUTER JOIN Type tp USING(typeID) LEFT OUTER JOIN Status st USING(statusID)",callback);

    return res;
  },

  getMaxId: function(id, callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

   console.log("before");
    let res = db.query("select max(ideaID) AS maxId from Idea",callback);
  console.log("after");
    return res;
  },

// Service layer function having business logic to search the ideas based on filtered query and sort it based on user preferences.
  getIdeaBySearchQuery: function(searchQuery,callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    searchQuery = '('+searchQuery+')';

    let res = db.query("SELECT ie.statusID, ie.typeID, ie.ideaID, ie.title, ie.description, ie.estTime, ie.cost, ie.docName,  " +
      "ie.usersID, tp.name AS  typeName, st.name AS statusName from Idea ie LEFT OUTER JOIN Type tp USING(typeID) LEFT OUTER JOIN " +
      "Status st USING(statusID) where ie.title REGEXP ?",[searchQuery],callback);

    return res;
  },

  getIdeaById: function(idType, evalID, id, callback) {

    let res;

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    if(idType=="ideaID") {

      res = db.query("SELECT ie.statusID, ie.typeID, ie.ideaID, ie.title, ie.description, ie.estTime, ie.cost, ie.docName,  " +
        "ie.usersID, tp.name AS  typeName, st.name AS statusName from Idea ie LEFT OUTER JOIN Type tp USING(typeID) LEFT OUTER JOIN Status st USING(statusID) where ideaID=?", [id], callback);
    }

  else if(idType=="usersID") {

      res = db.query("SELECT ie.statusID, ie.typeID, ie.ideaID, ie.title, ie.description, ie.estTime, ie.cost, ie.docName,  " +
        "ie.usersID, tp.name AS  typeName, st.name AS statusName from Idea ie LEFT OUTER JOIN Type tp USING(typeID) LEFT OUTER JOIN Status st USING(statusID) where usersID=?", [id], callback);
    }
  else if(idType=="typeID") {

      res = db.query("SELECT  distinct(ie.ideaID), ie.statusID, ie.typeID, ie.title, ie.description, ie.estTime, ie.cost, ie.docName,  " +
        "ie.usersID, tp.name AS  typeName, st.name AS statusName, ideaEvaluation.evalStatus as evalStatus from Idea ie LEFT OUTER JOIN Type tp USING(typeID) LEFT OUTER JOIN Status st USING(statusID) " +
        "LEFT OUTER JOIN (select * from IdeaEvaluation id where id.usersID = ?) as ideaEvaluation using(ideaID) where typeID = ?", [evalID, id], callback);
    }
  else if(idType=="statusID") {

      res = db.query("SELECT ie.statusID, ie.typeID, ie.ideaID, ie.title, ie.description, ie.estTime, ie.cost, ie.docName,  " +
        "ie.usersID, tp.name AS  typeName, st.name AS statusName from Idea ie LEFT OUTER JOIN Type tp USING(typeID) LEFT OUTER JOIN Status st USING(statusID) where statusID=?", [id], callback);
    }

    return res;
  },

  addNewIdea:function(newIdea,callback){

    let maxId = 0;
    db.connect(function (err) {
      if(err) {console.log(err.code)
        console.log("'Error connecting to Db'")};
      return;
    });

    db.query("select max(ideaID) AS maxId from Idea",function (err,rows) {

       if(!err) {
         maxId = rows[0].maxId + 1;
       db.query("Insert into Idea values(?,?,?,?,?,?,?,?,?)",[maxId,newIdea.title,newIdea.description,newIdea.estTime,newIdea.cost,newIdea.docName,
           newIdea.usersID,newIdea.typeID,1],callback);
       }
    });

  },

  //http://localhost:3000/routeIdea/15?updateAttr=all
  updateIdeaByStatus: function(id,idea,updateAttr,callback){

    let res;
    db.connect(function (err) {
      if(err) {console.log(err.code)
        console.log("'Error connecting to Db'")};
      return;
    });
    console.log(idea);

    if(updateAttr=='statusID')
      res = db.query("update Idea set  statusID=? where ideaID=?",[idea.statusID, id],callback);
    else if (updateAttr=='docName')
      res = db.query("update Idea set  docName=? where ideaID=?",[idea.docName, id],callback);
    else if (updateAttr=='all')
      res = db.query("update Idea set  title=? , description=? , estTime = ?, cost = ? , typeID=?  , docName=?" +
        " where ideaID=?",[idea.title, idea.description, idea.estTime, idea.cost, idea.typeID, idea.docName, id],callback);

    // db.end();
    return res;
  },

  deleteIdea: function(id,callback){

    db.connect(function (err) {
      if(err) {console.log(err.code)
        console.log("'Error connecting to Db'")};
      return;
    });

    let res = db.query("delete from Idea where ideaID=?",[id],callback);
    // db.end();
    return res;

}
};

module.exports=Idea;
