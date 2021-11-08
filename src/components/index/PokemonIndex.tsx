import React, { useEffect, useState } from "react";
import { pokemonListCache } from "../../utils/caches";
import { PokemonListItem } from "../../utils/commonTypes";
import { getAllPokemonInBag } from "../../utils/localStorageHandlers";
import Spinner from "../common/Spinner";
import {
  IndexContainer,
  SearchBar,
  SearchIcon,
  SearchInput,
  PokemonGridContainer,
  PokemonLink,
  PokemonContainer,
  ButtonGroup,
  FilterButton,
  NoResultsCard
} from "./PokemonIndexStyles";

const generatePokemonImageURL = (id: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}
interface PokemonData {
  name: string,
  url: string,
}

const PokemonIndex = (): React.ReactElement => {
  const [pokemonList, updatePokemonList] = useState(pokemonListCache["data"] ?? []);
  const [searchTerm, updateSearchTerm] = useState('');
  const [selectedFilter, updateSelectedFilter] = useState<'all' | 'bag'>('all');

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
          updatePokemonList(pokemonData)
        });
    }
	});

  const getFilteredPokemon = (): PokemonListItem[] => {
    const filteredBySearch = searchTerm ? pokemonList.filter((pokemon) =>
			pokemon.name.includes(searchTerm.toLowerCase())
		) : pokemonList;
    if (selectedFilter === 'all') {
      return filteredBySearch;
    } else {
      const pokemonInBag = getAllPokemonInBag();
      return filteredBySearch.filter(pokemon => pokemonInBag.includes(pokemon.id.toString()))
    }
  }

  if (pokemonList.length) {
    const filteredPokemon = getFilteredPokemon();
		return (
			<IndexContainer>
				<ButtonGroup>
					<FilterButton
						selected={selectedFilter === "all"}
						onClick={() => updateSelectedFilter("all")}
					>
						All
					</FilterButton>
					<FilterButton
						selected={selectedFilter === "bag"}
						onClick={() => updateSelectedFilter("bag")}
					>
						Bag
					</FilterButton>
				</ButtonGroup>
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
          <NoResultsCard>
            No Results Found
          </NoResultsCard>
				)}
			</IndexContainer>
		);
	} else {
		return <Spinner/>;
	}
};

export default PokemonIndex;
