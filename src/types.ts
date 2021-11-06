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
}

interface PokemonAbilityWrapper {
  ability: PokemonAbility
}

interface PokemonAbility {
  name: string,
  url: string
}

interface PokemonMoveWrapper {
  move: PokemonMove
}

interface PokemonMove {
  name: string,
  url: string
}

interface PokemonSprite {
  front_default: string;
}
