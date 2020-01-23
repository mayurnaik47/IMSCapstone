/*
This file manages the Rest API routing and calls the servers as per the url.
 */

//Initialising routing parameters.

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var IdeaType=require('../models/ideaType');

//Service defined to retrieve all the Ideas

router.get('/:id?',function(req,res,next) {
  if(req.params.id) {

    IdeaType.getTypeById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });

  }
  else {

    IdeaType.getAllTypes(function (err, rows) {

      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});



// Service defined to insert the New Idea
router.post('/',function(req,res){

  IdeaType.addNewType(req.body,function(err,count){
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
