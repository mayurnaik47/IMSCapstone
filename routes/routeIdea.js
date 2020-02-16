/*
This file manages the Rest API routing and calls the servers as per the url.
 */

//Initialising routing parameters.

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Idea=require('../models/idea');

//Service defined to retrieve all the Ideas

router.get('/:id?',function(req,res,next) {

  if(req.params.id) {

    Idea.getIdeaById(req.query.idType, req.query.evalID, req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });

  }
  else {

    Idea.getAllIdeas(function(err,rows){

      if(err)
      {
        res.json(err);
      }
      else{
        res.json(rows);
      }
    });
  }
});

// REST Controller to search the required Ideas from the database based on User Input.
// Access Type : GET
// Path Variable: {id}
// Query Params: {searchQuery}

router.get('/searchQuery/:id',function(req,res) {
  Idea.getIdeaBySearchQuery(req.query.searchQuery, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });

});

// MaxID

router.get('/maxId/:id',function(req,res) {

  Idea.getMaxId(req.params.id, function (err, rows) {

    if (err) {

      res.json(err);
    } else {

      res.json(rows[0]);
      console.log(res);
    }
  });

});

// Service defined to insert the New Idea
router.post('/',function(req,res){

Idea.addNewIdea(req.body,function(err,newId){
    if(err)
    {
      res.json(err);
    }
    else{
      res.json(req.body);
    }
  });
});


// Service defined to update the idea details
router.put('/:id',function(req,res){

  Idea.updateIdeaByStatus(req.params.id,req.body,req.query.updateAttr,function(err,rows){

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

// Service defined to delete the idea details
router.delete('/:id',function(req,res,next){

  Idea.deleteIdea(req.params.id,function(err,count){

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
