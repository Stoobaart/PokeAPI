var express = require("express");
var router = express.Router();
var pokemonsController = require('../controllers/pokemons');

router.route('/')
  .get(pokemonsController.index)
  .post(pokemonsController.create);

router.get('/new', pokemonsController.new);

router.route('/:id')
  .get(pokemonsController.show)
  .put(pokemonsController.update)
  .delete(pokemonsController.delete);

router.get('/:id/edit', pokemonsController.edit);


module.exports = router;