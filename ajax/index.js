$(function(){

	setInterval(function() {
		$.get('http://localhost:3000/api/pokemons', function(data) {
		var pokemon = data.pokemons.sort({_id:-1}).limit(1);
		console.log(pokemon);
		$("#latestPokemon").html(pokemon);
		})
	}, 5000)
});

<div class="container">
	<h1 id="latestPokemon">Newest Pokemon</h1>
	<div class="row">
		<div class="col-sm-4">
			<div class="card">
				<img class="cardImg" src= <%= pokemons.url %> >
					<div class="card-block">
						<h3 class="card-title"><%= pokemons.name %></h3>
						<p><%= pokemons.descriptions %></p>
						<ul>
							<li>Abilities: <%= pokemons.abilities %></li>
							<li>Evolutions: <%= pokemons.evolutions %></li>
							<li>Moves: <%= pokemons.moves %></li>
							<li>HP: <%= pokemons.hp %></li>
							<li>Attack: <%= pokemons.attack %></li>
							<li>Defence: <%= pokemons.defence %></li>
							<li>Speed: <%= pokemons.speed %></li>
						</ul>
						<a href="/<%= pokemons._id %>" class="btn btn-primary">More Info!</a>
					</div>
			</div>
		</div>
	</div>
</div>