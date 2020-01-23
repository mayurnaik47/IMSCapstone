/*
This file manages the Rest API routing and calls the servers as per the url.
 */

//Initialising routing parameters.

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var User=require('../models/users');

//Service defined to retrieve all the Ideas

router.get('/:id?',function(req,res,next) {

  if(req.params.id) {

    User.getUserById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(rows);
      }
    });

  }
  else {

    User.getAllUsers(function(err,rows){

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


router.get('/getUserByType/:id?',function(req,res) {
    User.getUserByType(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });

});

router.get('/getUserByUsername/:uname?',function(req,res) {

  User.getUserByUsername(req.params.uname, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });

});

// Service defined to insert the New Idea
router.post('/',function(req,res){

  User.addNewUser(req.body,function(err,count){
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

  User.updateUsersById(req.params.id,req.body,function(err,rows){

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
router.delete('/:id',function(req,res){

  User.deleteUser(req.params.id,function(err,count){

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
