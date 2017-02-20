var mongoose = require('mongoose');

var PokemonSchema = mongoose.Schema({
  url: {
    type: String
  },
  name: { 
  	type: String, 
  	required: true
  },
  national_id: {
  	type: Number,
  },
  abilities: { 
  	type: String, 
  	required: true
  },
  evolutions: { 
  	type: String, 
  	required: true
  },
  descriptions: { 
  	type: String, 
  	required: true
  },
  moves: { 
  	type: String, 
  	required: true
  },
  hp: {
  	type: Number, 
  	required: true
  },
  attack: {
  	type: Number, 
  	required: true
  },
  defence: {
  	type: Number, 
  	required: true
  },
  speed: {
  	type: Number, 
  	required: true
  },
  likes: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Pokemon', PokemonSchema);