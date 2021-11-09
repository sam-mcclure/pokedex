import React, { useEffect, useState } from "react";
import { pokemonListCache } from "../../utils/caches";
import { PokemonFilter, PokemonListItem } from "../../utils/commonTypes";
import { getAllPokemonInBag } from "../../utils/localStorageHandlers";
import Spinner from "../common/Spinner";
import FilterButtons from "./FilterButtons";
import NoResultsCard from "./NoResultsCard";
import PokemonIndexItem from "./PokemonIndexItem";
import {
  IndexContainer,
  PokemonGridContainer,
} from "./PokemonIndexStyles";
import SearchBar from "./SearchBar";

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
  const [selectedFilter, updateSelectedFilter] = useState<PokemonFilter>('all');

	useEffect(() => {
    if (!pokemonListCache.length) {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
				.then((res) => res.json())
				.then(res => {
          const pokemonData: PokemonListItem[] = [];

          res.results.forEach((pokemon: PokemonData, idx: number) => {
            const id = idx + 1;
            pokemonData.push({'name': pokemon.name, 'id': id, imageUrl: generatePokemonImageURL(id)})
          })

          pokemonListCache.push(...pokemonData);
          updatePokemonList(pokemonData)
        })
        .catch(err => console.log(err));
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

  const onUpdateSelectedFilter = (filter: PokemonFilter): void => {
    updateSelectedFilter(filter);
  }

  const onUpdateSearchTerm = (term: string): void => {
		updateSearchTerm(term);
	};

  if (pokemonList.length) {
    const filteredPokemon = getFilteredPokemon();
		return (
			<IndexContainer>
				<FilterButtons
          selectedFilter={selectedFilter}
          updateSelectedFilter={onUpdateSelectedFilter}
        />
        <SearchBar searchTerm={searchTerm} updateSearchTerm={onUpdateSearchTerm} />
				{filteredPokemon.length ? (
					<PokemonGridContainer>
						{filteredPokemon.map((pokemon) => <PokemonIndexItem pokemon={pokemon} />)}
					</PokemonGridContainer>
				) : (
          <NoResultsCard />
				)}
			</IndexContainer>
		);
	} else {
		return <Spinner/>;
	}
};

export default PokemonIndex;
