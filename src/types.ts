// NOTE: This is not the full typing for the Pokemon object, I'm only declaring the types I'm using

export interface Pokemon {
  id: number,
  order: number,
  name: string,
  height: number,
  weight: number,
  abilities: PokemonAbilityWrapper[],
  moves: PokemonMoveWrapper[],
  sprites: PokemonSprite,
  types: PokemonTypeWrapper[]
}

interface PokemonAbilityWrapper {
  ability: GenericAPIItem
}
interface PokemonMoveWrapper {
  move: GenericAPIItem
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
