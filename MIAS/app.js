var createError = require('http-errors');
var express = require('express');
// path module is used to access our application path directory
// 
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Creates an object of express to access all the functions inside it
var app = express();

// view engine setup
// app.set is used to store certian values for a variable which can be used to configure our server
// certain names are already allocated for server to be used to configure it
// views variable - used to denote a directory where our application templates are available
// view engine variable -  coontains template engine value(ejs, handlebars, etc.) to use and default is jade
// All variable set up using app.set can be accessed using app.get function
// app.set sets the application's server variables 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use loads the middleware function at the specified path
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// express.static function is used to server the static files such as images, CSS, javascript files
// public directory contains all the static files needed for our application
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
