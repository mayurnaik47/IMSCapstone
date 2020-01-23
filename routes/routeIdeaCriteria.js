/*
This file manages the Rest API routing and calls the servers as per the url.
 */

//Initialising routing parameters.

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var IdeaCriteria=require('../models/ideaCriteria');

//Service defined to retrieve all the Ideas

router.get('/:id?',function(req,res,next) {

  IdeaCriteria.getAllCriteria(function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json(rows);
    }
  });
});


router.get('/getCriteria/:phase?',function(req,res,next) {

  IdeaCriteria.getIdeaPhaseCriteria(req.params.phase, function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json(rows);
    }
  });
});


router.get('/getIdeaCriteria/:isActive?',function(req,res,next) {

  IdeaCriteria.getAllCriteriaForEvalIdAndUserId(req.query.phase,req.params.isActive,function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json(rows);
    }
  });
});

router.get('/getIdeaComments/:id?',function(req,res,next) {

  IdeaCriteria.getIdeaCommentsForIdeaID(req.params.id,function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json(rows);
    }
  });
});



// Service defined to update the idea details
router.put('/:id',function(req,res){

  IdeaCriteria.updateCriteria(req.params.id,req.body,function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json(rows);
    }
  });
});


// Service defined to insert the New Idea
router.post('/',function(req,res){

  IdeaCriteria.addNewCriteria(req.body,function(err,count){
    if(err)
    {
      res.json(err);
    }
    else{
      res.json(req.body);
    }
  });
});

module.exports=router;


