var mongoose = require('mongoose');
var rp = require('request-promise');

var port = process.env.PORT || 3000;

// mongoose.connect(port, function() {
// 	console.log("seeding file connected to db")
// })

rp('http://www.pokeapi.co/api/v1/pokedex')
    .then(function (data) {
        console.log(JSON.stringify(data))
    })
    .catch(function (err) {
        console.log(err.message);
    });