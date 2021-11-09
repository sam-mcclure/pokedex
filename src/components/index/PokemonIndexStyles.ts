import styled from "styled-components";

export const IndexContainer = styled.div`
	padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  height: auto;
`;

export const PokemonGridContainer = styled.div`
	padding-top: 25px;
  width: 100%;
  height: auto;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	column-gap: 25px;
	row-gap: 25px;

	@media (max-width: 700px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 400px) {
		grid-template-columns: 1fr;
	}
`
