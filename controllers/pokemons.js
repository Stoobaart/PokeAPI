function indexPokemons(req, res) {
	res.send('index');
}

function showPokemons(req, res) {
	res.send('show');
}

function newPokemons(req, res) {
	res.send('new');
}

function createPokemons(req, res) {
	res.send('create');
}

function editPokemons(req, res) {
	res.send('edit');
}

function updatePokemons(req, res) {
	res.send('update');
}

function deletePokemons(req, res) {
	res.send('delete');
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