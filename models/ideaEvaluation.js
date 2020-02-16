

var db=require('../dbconnection'); //reference of dbconnection.js

var IdeaEvaluation= {


  addNewIdeaRatingsbyCriteria:function(newRatings,callback){


    db.connect(function (err) {
      if(err) {console.log(err.code)
        console.log("'Error connecting to Db'")};
      return;
    });

        db.query("Insert into IdeaEvaluation values(?,?,?,?,?)",[newRatings.critID,newRatings.usersID,newRatings.ideaID,newRatings.rating,newRatings.evalStatus],callback);

    return newRatings;

  } ,

  updateIdeaRatingsbyCriteria:function(newRatings,callback){


    db.connect(function (err) {
      if(err) {console.log(err.code)
        console.log("'Error connecting to Db'")};
      return;
    });

    db.query("update IdeaEvaluation set rating = ? where critID = ? and usersID = ? and ideaID = ?",[newRatings.rating,newRatings.critID,newRatings.usersID,newRatings.ideaID],callback);

    return newRatings;

  },

  updateIdeaEvalStatus:function(newRatings,callback){


    db.connect(function (err) {
      if(err) {console.log(err.code)
        console.log("'Error connecting to Db'")};
      return;
    });

    db.query("update IdeaEvaluation set evalStatus = ? where critID = ? and usersID = ? and ideaID = ?",[newRatings.evalStatus,newRatings.critID,newRatings.usersID,newRatings.ideaID],callback);

    return newRatings;

  },

  getIdeaRatings: function(ideaID, usersID, callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("select * from IdeaEvaluation where ideaID = ? and usersID = ?",[ideaID,usersID], callback);

    return res;
  },

  getAvgSubmittedIdeas: function(ideas, callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let ideaIds = ideas.map(function (val, index) {
      return val.ideaID;
    });

    let res = db.query("select avg(rating) as score, ideaID from IdeaEvaluation group by IdeaID having IdeaID IN ( ? ) order by score desc",[ideaIds], callback);

    return res;
  },

  getEvaluatorType: function(evalID, callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("select * from Evaluators where usersID = ?",[evalID], callback);

    return res;
  },

  getEvaluatorsByType: function(typeID, callback){

    db.connect(function (err) {
      if(err) {
        console.log(err.code)
        console.log("'Error connecting to Db'");
        return;
      }
    });

    let res = db.query("select * from Evaluators where typeID = ?",[typeID], callback);

    return res;
  },

  deleteScores: function(id,callback){

    db.connect(function (err) {
      if(err) {console.log(err.code)
        console.log("'Error connecting to Db'")};
      return;
    });

    let res = db.query("delete  from IdeaEvaluation",[id],callback);
    // db.end();
    return res;

  }



};


module.exports=IdeaEvaluation;
