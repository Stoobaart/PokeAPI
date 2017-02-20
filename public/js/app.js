$(function(){

	// setInterval(function() {
	// 	$.get('http://localhost:3000/api/pokemons', function(data) {
	// 	var pokemon = data.pokemons.sort({_id:-1}).limit(1);
	// 	console.log(pokemon);
	// 	$("#latestPokemon").html(pokemon);
	// 	})
	// }, 5000)

	// $(".likeBtn").on("click", function(event) {
	// 	var pokemonId = $(this).attr("data-pokemon");

	//     var data = $.get('http://localhost:3000/api/pokemons/' + pokemonId + ".likes", function() {
	//     	console.log(JSON.stringify(data));
	//     })
	// })

	$(".likeBtn").click(function() {
		var pokemonId = $(this).attr("data-pokemon");
		$.ajax({
			type: 'PATCH',
			url: "/api/pokemons/" + pokemonId
		}).catch(function(err) {
			console.log(err);
		}).done(function(response) {
			console.log(response);
			$("#"+pokemonId+" .likes").html("Likes: "+response.likes)
		})
	})

	// var pokemon;
	// $.getJSON('http://localhost:3000/api/pokemons', function(json){
	//     pokemon = json;
	//     checkPokemon();
	// });

	// function checkPokemon() {
	// 	var random = Math.floor((Math.random() * 6));
	//     console.log(pokemon[random]);
	// }   

	// console.log(random);

	// setInterval(function() {
	// 	$("#randPokemon").html(pokemon[random]);
	// }, 5000)

});
