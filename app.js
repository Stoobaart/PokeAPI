var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = require('./config/routes');
var mongoose = require('mongoose');
var layouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

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

app.set('view engine', 'ejs');

app.use(layouts);

app.use(router);

app.listen(port , function(){
  console.log('listening on port ' + port);
});

module.exports = app;