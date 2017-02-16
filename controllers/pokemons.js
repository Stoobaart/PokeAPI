var Pokemon = require('../models/pokemon');

function indexPokemons(req, res) {
	Pokemon.find({}, function(err, pokemons) {
		if(err) return res.status(500).send(err);
		res.render("pokemons/index" , {
			title: "Pokemon",
			pokemons: pokemons
		});
	});
}

function showPokemons(req, res) {
	Pokemon.findById(req.params.id, function(err, pokemon) {
		if(!pokemon) return res.status(404).send("Not Found");
		if(err) return res.status(500).send(err);
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
	    speed: 0
	}

	res.render("pokemons/new", {
	title: "New Pokemon",
	pokemon: newPokemon
	});
}

function createPokemons(req, res) {
	Pokemon.create(req.body, function(err, pokemon) {
		if(err) return res.status(500).send(err);
		res.redirect("/");
	});
}

function editPokemons(req, res) {
	Pokemon.findById(req.params.id, function(err, pokemon){
		if(!pokemon) return res.status(404).send("Not Found");
		if(err) return res.status(500).send(err);
		console.log(pokemon)
		res.render("pokemons/edit", {
			title: "Pokemon",
			pokemon: pokemon
		});
	});
}

function updatePokemons(req, res) {
	console.log(req.params.id);
	Pokemon.findByIdAndUpdate(
		req.params.id, 
		{ $set: req.body},
		{ runValidators: true, new: true },
		function(err, pokemon){
			if(err) return res.status(500).send(err);
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