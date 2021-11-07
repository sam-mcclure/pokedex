import { Pokemon, PokemonListItem } from "./commonTypes";

interface PokemonListCache {
  [key:string]: PokemonListItem[],
}

export const pokemonListCache: PokemonListCache  = {};

interface PokemonInfoCache {
  [key: string]: Pokemon
}

export const pokemonInfoCache: PokemonInfoCache = {};
