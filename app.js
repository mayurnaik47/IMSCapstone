/*
This file is the core nodeJS start file which manages the API calls and connection with MySql using express library.
This file handles all the routing and database queries which are described in all other child .js files like
routeProject.js , student.js, faculty.js, resinterest.js, public.js, studentreq.js and project.js.
 */

// importing all the libraries.

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var routes = require('./routes/index');
var routeIdea = require('./routes/routeIdea');
var routeUsers = require('./routes/routeUsers');
var routeType = require('./routes/routeType');
var routeFeedback = require('./routes/routeFeedback');
var routeIdeaCriteria = require('./routes/routeIdeaCriteria');
var routePublic=require('./routes/routePublic');
var routeStatus=require('./routes/routeStatus');
var routeIdeaEvaluation=require('./routes/routeIdeaEvaluation');
var file=require('./routes/file');
var app = express();

//Initialising the server parameters.

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use('/routeIdea', routeIdea);
app.use('/routeUsers', routeUsers);
app.use('/routeType', routeType);
app.use('/routeFeedback',routeFeedback);
app.use('/routeIdeaCriteria',routeIdeaCriteria);
app.use('/routePublic',routePublic);
app.use('/routeStatus',routeStatus);
app.use('/routeIdeaEvaluation',routeIdeaEvaluation);
app.use('/file',file);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
  //res.render('error');
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);

});


module.exports = app;
