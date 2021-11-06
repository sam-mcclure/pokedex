import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Pokemon } from '../../types';

const genericDescription = "This is the greatest Pokemon that has ever lived. If you don't have one, you need to go out and catch it right now"

const DetailContainer = styled.div`
  padding: 60px;
  display: flex;
  flex-direction: column;
`;

const PokemonImage = styled.img`
  max-width: 250px;
  height: auto;
`;

const InfoItemDiv = styled.div`
  padding-bottom: 15px;
`;

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
			<DetailContainer>
				<PokemonImage src={pokemon.sprites.front_default} alt={`${pokemon.name}`} />
				<InfoItemDiv>{pokemon.name}</InfoItemDiv>
				<InfoItemDiv>Height {pokemon.height}</InfoItemDiv>
				<InfoItemDiv>Weight {pokemon.weight}</InfoItemDiv>
				<InfoItemDiv>
					Type {pokemon.types.map((typeItem) => typeItem.type.name + " ")}
				</InfoItemDiv>
				<InfoItemDiv>{genericDescription}</InfoItemDiv>
				<InfoItemDiv>
					Abilities{" "}
					{pokemon.abilities.map(
						(abilityItem) => abilityItem.ability.name + " "
					)}
				</InfoItemDiv>
			</DetailContainer>
		);
  } else {
    return <div />
  }
}

export default PokemonDetail;
