require('module-alias/register');
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('@routes/index');
var loginRouter = require('@routes/login');
var logoutRouter = require('@routes/logout');
var signinRouter = require('@routes/signin');
var profileRouter = require('@routes/profile');
var jobsRouter = require('@routes/jobs');
var rankingRouter = require('@routes/ranking');
var replacementRouter = require('@routes/replacement');
var vacantsRouter = require('@routes/vacants');
var professionalExperiencesRouter = require('@routes/professional_experiences');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signin', signinRouter);
app.use('/profile', profileRouter);
app.use('/jobs', jobsRouter);
app.use('/ranking', rankingRouter);
app.use('/replacement', replacementRouter);
app.use('/vacants', vacantsRouter);
app.use('/professional-experiences', professionalExperiencesRouter);


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
