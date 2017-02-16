var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var expect = require('chai').expect;
var Pokemon = require('../models/pokemon');

chai.use(chaiHttp);

describe('Pokemons', function() {
  var pokemon = new Pokemon({
    url: "",
    name: "Stumon",
    national_id: 1,
    abilities: "fire",
    evolutions: "Stumon, Stumonster, Stumonstrocity",
    descriptions: "The best Pokemon",
    moves: "many",
    hp: 70,
    attack: 40,
    defence: 20,
    speed: 18
  });

  beforeEach(function(done) {
    pokemon.save(function(err, newPokemon) {
      if(err) return console.log(err);
      pokemon.id = newPokemon.id;
      done();
    })
  })

  afterEach(function(done) {
    Pokemon.findByIdAndRemove(pokemon.id, function(err) {
      if(err) return console.log(err);
      done();
    })
  })

  // SHOW
  it('should list a single pokemon on a /<id> GET', function(done) {
    var request = chai.request(app);
    request
      .get('/' + pokemon.id)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.match(/Pokemon/);
        done();
      });
  });

  // INDEX
  it('should list all Pokemons on / GET', function(done) {
    var request = chai.request(app);
    request
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.match(/Pokemon!/);
        // res.text.should.match(/Testokemon/);
        done();
      });
  });

  // CREATE
  it('should add a single pokemon on a / POST', function(done) {
    var request = chai.request(app);
    request.post('/')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        url: "",
        name: "Olliemon",
        national_id: 2,
        abilities: "ice",
        evolutions: "Olliemon, Olliemonster, Olliegarch",
        descriptions: "The 2nd best Pokemon",
        moves: "many",
        hp: 70,
        attack: 40,
        defence: 20,
        speed: 18
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.match(/Olliemon/);
        res.text.should.match(/ice/);
        done();
        // Pokemon.findByIdAndRemove(pokemon.id, function(err) {
        //   if (err) return console.log(err);
        //   done();
        // });
      });
  });

  it('should update a SINGLE pokemon on a /<id> PUT', function(done){
    var request = chai.request(app);
    request.put('/' + pokemon.id)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ 'abilities': 'earth', 'hp' : 90 })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.match(/earth/);
        res.text.should.match(/hp/);
        done();
      });
  });

  it('should delete a SINGLE pokemon on a /<id> DELETE', function(done) {
    var request = chai.request(app)
    request.delete('/' + pokemon.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.match(/Pokemon/);
        request
          .get('/' + pokemon.id)
          .end(function(err,res){
            res.should.have.status(404);
            done();
          });
      });
  });
});