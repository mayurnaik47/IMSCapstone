/*
This file manages the Rest API routing and calls the servers as per the url.
 */

//Initialising routing parameters.

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Feedback=require('../models/feedback');

//Service defined to retrieve all the Ideas

router.get('/:id?',function(req,res,next) {

    Feedback.getAllFeedbackbyId(req.params.id,function (err, rows) {

      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
});

// Service defined to insert the New Idea
router.post('/',function(req,res){

  let result = Feedback.addNewMessage(req.body);
  return res.json(result);

});


// Service defined to update the idea details
// router.put('/:id',function(req,res){
//
//   Idea.updateIdeaByStatus(req.params.id,req.body,req.query.updateAttr,function(err,rows){
//
//     if(err)
//     {
//       res.json(err);
//     }
//     else
//     {
//       res.json(rows);
//     }
//   });
// });
//
// // Service defined to delete the idea details
// router.delete('/:id',function(req,res,next){
//
//   Idea.deleteIdea(req.params.id,function(err,count){
//
//     if(err)
//     {
//       res.json(err);
//     }
//     else
//     {
//       res.json(count);
//     }
//
//   });
// });

module.exports=router;
