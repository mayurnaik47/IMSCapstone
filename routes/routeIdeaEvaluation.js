/*
This file manages the Rest API routing and calls the servers as per the url.
 */

//Initialising routing parameters.

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var IdeaEvaluation=require('../models/ideaEvaluation');


// Service defined to insert the New Idea
router.post('/',function(req,res){

  IdeaEvaluation.addNewIdeaRatingsbyCriteria(req.body,function(err,newId){
    if(err)
    {
      res.json(err);
    }
    else{
      res.json(req.body);
    }
  });
});

router.put('/',function(req,res){

  IdeaEvaluation.updateIdeaRatingsbyCriteria(req.body,function(err,newId){
    if(err)
    {
      res.json(err);
    }
    else{
      res.json(req.body);
    }
  });
});

router.put('/updateEvalStatus/',function(req,res){

  IdeaEvaluation.updateIdeaEvalStatus(req.body,function(err,newId){
    if(err)
    {
      res.json(err);
    }
    else{
      res.json(req.body);
    }
  });
});

router.get('/getIdeaRatings/:id?',function(req,res,next) {

  IdeaEvaluation.getIdeaRatings(req.params.id, req.query.userID, function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json(rows);
    }
  });
});


router.get('/getEvaluatorType/:id?',function(req,res,next) {

  IdeaEvaluation.getEvaluatorType(req.params.id, function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json(rows);
    }
  });
});

router.put('/getAvgSubmittedIdeasForRanking/:id?',function(req,res,next) {

  IdeaEvaluation.getAvgSubmittedIdeas(req.body, function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json(rows);
    }
  });
});

router.get('/getEvaluatorsByType/:id?',function(req,res,next) {

  IdeaEvaluation.getEvaluatorsByType(req.params.id, function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json(rows);
    }
  });
});

// Service defined to delete the idea details
router.delete('/:id',function(req,res,next){

  IdeaEvaluation.deleteScores(req.params.id,function(err,count){

    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json(count);
    }

  });
});




module.exports=router;
