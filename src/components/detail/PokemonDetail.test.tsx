import { cleanup, render, screen, waitFor } from '@testing-library/react';
import PokemonDetail from "./PokemonDetail";
import { Pokemon } from "../../utils/commonTypes";

const fakePokemon: Pokemon = {
	name: "Pikachu",
	id: 25,
	order: 25,
	height: 50,
	weight: 50,
	abilities: [{ ability: { name: "shock", url: "fake" } }],
	types: [{ slot: 25, type: { name: "electric", url: "fake" } }],
	sprites: {
		front_default:
			"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
	},
};

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(fakePokemon)
  }))
})

test('it should show the pokemon data on the page', async () => {
	render(<PokemonDetail />);

	waitFor(async () => {
		const items = await screen.findAllByText("pikachu")
		expect(items).toHaveLength(1)}
	);
})

afterEach(cleanup);
