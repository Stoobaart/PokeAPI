var User = require('../models/user');

function showUser(req, res) {
  User.findById(req.params.id).populate('pokemons').exec(function(err, user) {
    if(!user) return res.status(404).send("Pokemon not found");
    if(err) req.flash('error', err.message);
    console.log(user);
    res.render("users/show", {
      title: "User",
      user: user
    });
  });
}

// NEW ( AKA Registration )
function newUser(req,res) {
  res.render('users/new' , { title: "Register" });
}

// CREATE - Handles registrations
function createUser(req,res){
  // save the user
  var user = new User(req.body);
  user.save(function(err,user){
    // check for errors and return 500 if there was a problem
    if(err) req.flash('error' , err.message);
    // redirect to the posts index page
    res.redirect("/");
  });
}

module.exports = {
  new: newUser,
  create: createUser,
  show: showUser
}