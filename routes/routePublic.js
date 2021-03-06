/*
This file manages the Rest API routing and calls the servers as per the url.
 */

//Initialising routing parameters.

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var PublicMessage = require('../models/public');

//Service defined to retrieve all the Ideas

router.get('/:id?',function(req,res,next) {

  PublicMessage.getAllMessages(function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json(rows);
    }
  });
});

// Get current phase
router.get('/phase/:id?',function(req,res,next) {

  PublicMessage.getPhaseState(function(err,rows){

    if(err)
    {
      res.json(err);
    }
    else{
      res.json(rows);
    }
  });
});

// update phase and status
router.put('/phase/:id',function(req,res){

  PublicMessage.updatePhase(req.params.id,req.query.action,function(err,rows){

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



module.exports=router;
