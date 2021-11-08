export const getAllPokemonInBag = (): string[] => {
  const localInfo = localStorage.getItem("PokemonBag");

  if (localInfo) {
    return JSON.parse(localInfo);
  } else {
    return [];
  }
}

export const isPokemonInBag = (id: string): boolean => {
  const currBag = getAllPokemonInBag();
  return currBag.includes(id);
}

export const addPokemonToBag = (id: string):void => {
  const currBag = getAllPokemonInBag();

  if (!currBag.includes(id)) {
    currBag.push(id);
    localStorage.setItem("PokemonBag", JSON.stringify(currBag));
  }
}

export const removePokemonFromBag = (id: string): void => {
  const updatedBag = getAllPokemonInBag().filter(pokeId => pokeId !== id);
  localStorage.setItem("PokemonBag", JSON.stringify(updatedBag));
}
