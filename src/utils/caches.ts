import { Pokemon, PokemonListItem } from "./commonTypes";

export const pokemonListCache: PokemonListItem[]  = [];

interface PokemonInfoCache {
  [key: string]: Pokemon
}

export const pokemonInfoCache: PokemonInfoCache = {};
