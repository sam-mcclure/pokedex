import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { pokemonListCache } from "../../caches";
import { PokemonListItem } from "../../commonTypes";

const generatePokemonImageURL = (id: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

interface PokemonData {
  name: string,
  url: string,
}

const DetailContainer = styled.div`
	padding: 60px;
	display: flex;
	flex-direction: column;
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
			<DetailContainer>
        {pokemonListCache["data"].map((pokemon: PokemonListItem) => {
          return (
						<div key={pokemon.id}>
							<Link to={`pokemon/${pokemon.id}`}>
								<img src={pokemon.imageUrl} alt={pokemon.name} />
								<div>{pokemon.name}</div>
							</Link>
						</div>
					);
        })}
			</DetailContainer>
		);
	} else {
		return <div>Loading</div>;
	}
};

export default PokemonIndex;
