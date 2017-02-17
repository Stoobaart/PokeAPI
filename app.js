var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = require('./config/routes');
var mongoose = require('mongoose');
var layouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var User = require('./models/user');

app.use(express.static('public'))

app.use(cookieParser());

app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: 'spartasupersecretkey'
}));

//load logged in user
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

app.use(flash());

mongoose.connect('mongodb://localhost/pokemonDb');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
	    var method = req.body._method
	    delete req.body._method
		return method
	}
}));

app.use(function(req, res, next){
    // res.locals will be available in every template
    res.locals.errors = req.flash('error');
    next();
});

// check for login on all routes except sessions
app.use(function(req, res, next) {
  var urls = ["/sessions/new", "/users/new", "/sessions", "/users"];
  if(urls.indexOf(req.url) === -1) {
    if (!req.user) return res.redirect('/sessions/new');
  }
  next();
});

app.set('view engine', 'ejs');

app.use(layouts);

app.use(router);

app.listen(port , function(){
  console.log('listening on port ' + port);
});

module.exports = app;