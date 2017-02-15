var express = require('express');
var app = express();
var layouts = require('express-ejs-layouts');
var routes = require('./config/routes');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var User = require('./models/user');

// add support for cookies
app.use(cookieParser());

// add support for sessions
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'spartasupersecretkey'
}));

// load logged in user
app.use(function(req,res,next) {

  // no user id? just move on
  if(!req.session.user) {
       res.locals.user = false;
      next();
  } else {

    // load the user with the ID in the session
    User.findById(req.session.user , function(err, user){

      if(user) {
        // add the user to the request object
        req.user = user;
        // add it to locals so we can use it in all templates
        res.locals.user = user;
      } else {
        // couldn't find it... that's weird. clear the session
        req.session.user = null;
      }
      next(err);
    });
  }
});

// add flash messaging support
app.use(flash());

// middleware to make flash messages available in every template
app.use(function(req, res, next){
  // res.locals will be available in every template
  res.locals.errors = req.flash('error');
  next();
});

// track page views
app.use(function (req , res, next) {
  // we now have an object on req that contains our session
  var views = req.session.views;
  // increase the page view count
  if(views)
    views++;
  else
    views = 0;

  // everything is on req now as we don't send the session back in the response
   req.session.views = views;
   // move on to the next middleware
   next();
}); 

// connect to the database
mongoose.connect('mongodb://localhost/posts');

// body parser for form data
app.use(bodyParser.urlencoded({ extended: false }));

// body parser for json data
app.use(bodyParser.json());

// method override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// tell express to use ejs for rendering templates
app.set('view engine' , 'ejs');

// use express layouts middleware too
app.use(layouts);

// check for login on all routes except sessions
app.use(function(req, res, next) {
  var urls = ["/sessions/new", "/users/new", "/sessions", "/users"];
  if(urls.indexOf(req.url) === -1) {
    if (!req.user) return res.redirect('/sessions/new');
  }
  next();
});

// add the router last
app.use(routes);

app.listen(3000 , function(){
  console.log('listening on port 3000');
});