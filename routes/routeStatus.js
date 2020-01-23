/*
This file manages the Rest API routing and calls the servers as per the url.
 */

//Initialising routing parameters.

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var IdeaStatus=require('../models/ideaStatus');

//Service defined to retrieve all the Ideas

router.get('/:id?',function(req,res,next) {
  if(req.params.id) {

    IdeaStatus.getStatusById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });

  }
  else {

    IdeaStatus.getAllStatus(function (err, rows) {

      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});



module.exports=router;
