import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { pokemonListCache } from "../../caches";
import { PokemonListItem } from "../../commonTypes";
import Spinner from "../common/Spinner";

const generatePokemonImageURL = (id: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

interface PokemonData {
  name: string,
  url: string,
}

const IndexContainer = styled.div`
	padding: 60px;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	column-gap: 25px;
	row-gap: 25px;

	@media (max-width: 700px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 400px) {
		grid-template-columns: 1fr;
	}
`;

const PokemonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px 0px;
	border-radius: 8px;

	:hover {
		background-color: rgba(241, 241, 241, 0.6);
		transition: all 0.2s ease-in-out;
		transform: scale(1.05);
	}
`;


const PokemonLink = styled(Link)`
	text-decoration: none;
  color: black;
`;

const PokemonIndex = (): React.ReactElement => {
  const [pokemonList, updatePokemonList] = useState(pokemonListCache);

	useEffect(() => {
    if (!pokemonListCache['data']) {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
				.then((res) => res.json())
				.then(res => {
          const pokemonData: PokemonListItem[] = [];

          res.results.forEach((pokemon: PokemonData, idx: number) => {
            const id = idx + 1;
            pokemonData.push({'name': pokemon.name, 'id': id, imageUrl: generatePokemonImageURL(id)})
          })

          pokemonListCache["data"] = pokemonData;
          updatePokemonList({"data" : pokemonData})
        });
    }
		
	});

  if (pokemonList['data']) {
		return (
			<IndexContainer>
        {pokemonListCache["data"].map((pokemon: PokemonListItem) => {
          return (
						<PokemonLink to={`pokemon/${pokemon.id}`} key={pokemon.id}>
							<PokemonContainer>
								<img src={pokemon.imageUrl} alt={pokemon.name} />
								<div>{pokemon.name}</div>
							</PokemonContainer>
						</PokemonLink>
					);
        })}
			</IndexContainer>
		);
	} else {
		return <Spinner/>;
	}
};

export default PokemonIndex;
