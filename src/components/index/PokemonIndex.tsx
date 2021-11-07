import React, { useEffect, useState } from "react";
import { pokemonListCache } from "../../caches";
import { PokemonListItem } from "../../commonTypes";
import { CenteredDiv } from "../common/GenericStyles";
import Spinner from "../common/Spinner";
import {
  IndexContainer,
  SearchBar,
  SearchIcon,
  SearchInput,
  PokemonGridContainer,
  PokemonLink,
  PokemonContainer
} from "./PokemonIndexStyles";

const generatePokemonImageURL = (id: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

interface PokemonData {
  name: string,
  url: string,
}

const PokemonIndex = (): React.ReactElement => {
  const [pokemonList, updatePokemonList] = useState(pokemonListCache);
  const [searchTerm, updateSearchTerm] = useState('');

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
    const filteredPokemon = pokemonList["data"].filter(
      (pokemon) => pokemon.name.includes(searchTerm.toLowerCase())
    );
		return (
			<IndexContainer>
				<SearchBar>
          <SearchIcon>
					  <i className="fas fa-search"></i>
          </SearchIcon>
					<SearchInput
						type="text"
						placeholder="Search"
						value={searchTerm}
						onChange={(e) => updateSearchTerm(e.target.value)}
					/>
				</SearchBar>
				{filteredPokemon.length ? (
					<PokemonGridContainer>
						{filteredPokemon.map((pokemon) => {
							return (
								<PokemonLink to={`pokemon/${pokemon.id}`} key={pokemon.id}>
									<PokemonContainer>
										<img src={pokemon.imageUrl} alt={pokemon.name} />
										<div>{pokemon.name}</div>
									</PokemonContainer>
								</PokemonLink>
							);
						})}
					</PokemonGridContainer>
				) : (
					<CenteredDiv>No Results Found</CenteredDiv>
				)}
			</IndexContainer>
		);
	} else {
		return <Spinner/>;
	}
};

export default PokemonIndex;
