import { addPokemonToBag, getAllPokemonInBag, isPokemonInBag, removePokemonFromBag } from "./localStorageHandlers";

const mockLocalStorage = (() => {
  let store = {} as {[key: string]: string};

  return {
    getItem: (key: string) => store[key] || undefined,
    setItem: (key: string, value: string) => store[key] = value,
    clear: () => store = {}
  };
})();

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
  })
})

beforeEach(() => {
  window.localStorage.clear();
})

describe('getAllPokemonInBag', () => {
  test('returns an empty array if there are no pokemon in the bag', () => {
    const result = getAllPokemonInBag();
    expect(result).toStrictEqual([]);
  })

  test('returns list of pokemon ids if they have been added to the bag', () => {
    window.localStorage.setItem('PokemonBag', JSON.stringify(['1', '2', '3']))
    const result = getAllPokemonInBag();
    expect(result).toEqual(['1', '2', '3']);
  })
})

describe('isPokemonInBag', () => {
  test('returns false if there are no pokemon in the bag', () => {
    const result = isPokemonInBag('1');
    expect(result).toStrictEqual(false);
  })

  test('returns false the pokemon is not in the bag and the bag is not empty', () => {
    window.localStorage.setItem('PokemonBag', JSON.stringify(['1', '2', '3']))
    const result = isPokemonInBag('4');
    expect(result).toStrictEqual(false);
  })

  test('returns true if the pokemon is in the bag', () => {
    window.localStorage.setItem('PokemonBag', JSON.stringify(['1', '2', '3']))
    const result = isPokemonInBag('2');
    expect(result).toStrictEqual(true);
  })
})

describe('addPokemonToBag', () => {
  test('adds specified pokemonId to the bag', () => {
    addPokemonToBag('1');
    addPokemonToBag('2');
    expect(isPokemonInBag('1')).toStrictEqual(true);
    expect(isPokemonInBag('2')).toStrictEqual(true);
  })

  test('does not add the same pokemon twice', () => {
    addPokemonToBag('1');
    addPokemonToBag('2');
    addPokemonToBag('1');
    const result = getAllPokemonInBag();
    expect(result).toEqual(['1', '2']);
  })
})

describe('removePokemonFromBag', () => {
  test('removes pokemonId from the bag', () => {
    window.localStorage.setItem('PokemonBag', JSON.stringify(['1', '2', '3']))
    removePokemonFromBag('2');
    expect(isPokemonInBag('1')).toStrictEqual(true);
    expect(isPokemonInBag('2')).toStrictEqual(false);
  })

  test('does nothing if pokemonId was not in the bag', () => {
    window.localStorage.setItem('PokemonBag', JSON.stringify(['1', '2', '3']))
    removePokemonFromBag('4');
    const result = getAllPokemonInBag();
    expect(result).toEqual(['1', '2', '3']);
  })
})
