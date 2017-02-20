var express = require("express");
var router = express.Router();
var pokemonsController = require('../controllers/pokemons');
var usersController = require('../controllers/users');
var sessionsController = require('../controllers/sessions');
var pokemonsApiController = require('../controllers/api/pokemons');

// API section
router.route('/api/pokemons')
  .get(pokemonsApiController.index)
  .post(pokemonsApiController.create);

router.route('/api/pokemons/:id')
  .get(pokemonsApiController.show)
  .put(pokemonsApiController.update)
  .delete(pokemonsApiController.delete)
  .patch(pokemonsApiController.like);


// sessions
router.route('/sessions')
  .post(sessionsController.create)
  .delete(sessionsController.delete);

router.route('/sessions/new')
  .get(sessionsController.new);

// users
router.route('/users')
  .post(usersController.create);

router.route('/users/new')
  .get(usersController.new);

router.route('/users/:id')
  .get(usersController.show);

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