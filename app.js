var express = require('express');
var path = require('path');
var logger = require('morgan');
var config = require('config');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use(function(req, res, next) {
  if(req.secure !== config.secure){
      res.status(403).json({error: "protocol is not allowed"});
  }else if(req.hostname !== config.hostname){
      res.status(403).json({error: "domain is not allowed"});
  }else if(req.get('authorization') !== config.authorization){
      res.status(403).json({error: "authorization failed"});
  }else{
      next();
  }
});
app.use('/program', require('./routes/program'));

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
  res.render('error');
});

module.exports = app;
