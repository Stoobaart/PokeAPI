var Pokemon = require('../../models/pokemon');


// INDEX - GET /
function indexPokemon(req , res) {
  // get the model to load all the pokemon. wait for data in the callback
  Pokemon.find({} , function(err, pokemons) {
    if(err) res.status(500).json({error: err.message});
    // data return so now we can render
    res.status(200).json(pokemons);
  });
}

// SHOW - GET /:id
function showPokemon(req , res) {
  Pokemon.findById(req.params.id , function(err, pokemon) {
    // check for errors or for no object found
    if(!pokemon) return res.status(404).send("Not found");
    if(err) res.status(500).json({error: err.message});
    res.status(200).json(pokemon);
  });
}

// DELETE - DELETE /:id
function deletePokemon(req , res) {
  // tell the data store to remove the post with the id in the request
  Pokemon.findByIdAndRemove(req.params.id , function(err) {
      if(err) return res.status(500).json({error: err.message});
      // redirect to a GET request
      res.status(204).json({
        message: "Successful deletion"
      });
  });

}

// UPDATE - UPDATE /:id
function updatePokemon(req , res) {
    // load, bind and save all in one hit
    Pokemon.findByIdAndUpdate(
        req.params.id,
        { $set:  req.body },
        { runValidators: true },
        function(err , pokemon){
          if(err) return res.status(500).json({error: err.message});
          // redirect the user to a GET route. We'll go back to the INDEX.
          res.status(204).json(pokemon);
        }
    );

}


// CREATE - POST /
function createPokemon(req , res) {
  // ask mongoose to save the data for us and wait for the response
  Pokemon.create( req.body , function(err, pokemon){
    // check for errors and return 500 if there was a problem
    if(err) return res.status(500).json({error: err.message});

    // redirect the user to a GET route. We'll go back to the INDEX.
    res.status(201).json({
      message: "Successfully created",
      pokemon: pokemon
    });
  });
}

function likePokemon(req, res) {
  Pokemon.findByIdAndUpdate(req.params.id, { $inc: { likes: 1}}, {new: true}, function(err, pokemon) {
    if (err) return res.status(500).json({ error: err.message});
    return res.status(200).json({message: "Request sending successfully", likes: pokemon.likes});
  })
}

// export all our controller functions in an object
module.exports = {

  index:indexPokemon,
  show: showPokemon,
  delete: deletePokemon,
  update: updatePokemon,
  create: createPokemon,
  like: likePokemon

}
