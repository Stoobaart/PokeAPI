var Pokemon = require('../models/pokemon');
var User = require('../models/user');

function indexPokemons(req, res) {
	Pokemon.find({}, function(err, pokemons) {
		if(err) req.flash('error' , err.message);
		res.render("pokemons/index" , {
			title: "Pokemon",
			pokemons: pokemons
		});
	});
}

function showPokemons(req, res) {
	Pokemon.findById(req.params.id, function(err, pokemon) {
		if(!pokemon) return res.status(404).send("Not Found");
		if(err) req.flash('error' , err.message);
		res.render("pokemons/show", {
			title: "Pokemon",
			pokemon: pokemon
		});
	});
}

function newPokemons(req, res) {
	var newPokemon = {
		id: "",
		url: "",
		name: "",
	    national_id: 0,
	    abilities: "",
	    evolutions: "",
	    descriptions: "",
	    moves: "",
	    hp: 0,
	    attack: 0,
	    defence: 0,
	    speed: 0,
	    likes: 0
	}

	res.render("pokemons/new", {
	title: "New Pokemon",
	pokemon: newPokemon
	});
}

function createPokemons(req, res) {
	Pokemon.create(req.body, function(err, pokemon) {
		if(err) req.flash('error' , "Something went wrong when adding your newly caught pokemon to your collection! Please retry");
		User.findByIdAndUpdate(req.user.id, { $addToSet: { pokemons: pokemon } }, function(err, user) {
			if (err) req.flash('error', 'Something went wrong when adding your new pokemon, please try again!');
			res.redirect("/");
		})
	});
}

function editPokemons(req, res) {
	Pokemon.findById(req.params.id, function(err, pokemon){
		if(!pokemon) return res.status(404).send("Not Found");
		if(err) req.flash('error' , err.message);
		res.render("pokemons/edit", {
			title: "Pokemon",
			pokemon: pokemon
		});
	});
}

function updatePokemons(req, res) {
	Pokemon.findByIdAndUpdate(
		req.params.id, 
		{ $set: req.body},
		{ runValidators: true, new: true },
		function(err, pokemon){
			if(err) req.flash('error' , err.message);
			res.redirect("/");
		}
	);
}

function deletePokemons(req, res) {
	Pokemon.findByIdAndRemove(req.params.id, function(err) {
		res.redirect("/")
	});
}

module.exports = {
	index: indexPokemons,
	show: showPokemons,
	new: newPokemons,
	create: createPokemons,
	edit: editPokemons,
	update: updatePokemons,
	delete: deletePokemons
}