import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Pokemon } from '../../types';

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
      <div>{pokemon.name}</div>
    )
  } else {
    return <div />
  }
}

export default PokemonDetail;
