interface PokemonAbilityWrapper {
  ability: GenericAPIItem
}

interface PokemonSprite {
  front_default: string;
}

interface PokemonTypeWrapper {
  slot: number,
  type: GenericAPIItem
}

interface GenericAPIItem {
  name: string,
  url: string,
}

// NOTE: This is not the full typing for the Pokemon object, I'm only declaring the types I'm using
export interface Pokemon {
  id: number,
  order: number,
  name: string,
  height: number,
  weight: number,
  abilities: PokemonAbilityWrapper[],
  sprites: PokemonSprite,
  types: PokemonTypeWrapper[]
}

export interface PokemonListItem {
  name: string,
  id: number,
  imageUrl: string,
}

export type PokemonFilter = 'all' | 'bag';
