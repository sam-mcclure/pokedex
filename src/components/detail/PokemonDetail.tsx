import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pokemon } from '../../types';

const genericDescription = "This is the greatest Pokemon that has ever lived. If you don't have one, you need to go out and catch it right now"

const PokemonDetail = ():React.ReactElement => {
  const pokemonId = useParams().id;
  const [ pokemon, updatePokemon ] = useState<null | Pokemon>(null)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(res => res.json())
      .then(res => updatePokemon(res));
  }, [pokemonId])
  
  if (pokemon) {
    return (
			<div>
				<img src={pokemon.sprites.front_default} alt={`${pokemon.name}`} />
				<div>{pokemon.name}</div>
				<div>Height: {pokemon.height}</div>
				<div>Weight: {pokemon.weight}</div>
				<div>
					Type {pokemon.types.map((typeItem) => typeItem.type.name + " ")}
				</div>
        <div>{genericDescription}</div>
				<div>
					Abilities:{" "}
					{pokemon.abilities.map(
						(abilityItem) => abilityItem.ability.name + " "
					)}
				</div>
				<div>
					Moves:{" "}
					{pokemon.moves.map(
						(moveItem) => moveItem.move.name + " "
					)}
				</div>
			</div>
		);
  } else {
    return <div />
  }
}

export default PokemonDetail;
