import { Link } from "react-router-dom";
import styled from "styled-components";

export const IndexContainer = styled.div`
	padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PokemonGridContainer = styled.div`
	padding: 60px;
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
`;

export const PokemonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px 0px;
	border-radius: 8px;

	:hover {
		background-color: rgba(241, 241, 241, 0.6);
		transition: all 0.2s ease-in-out;
		transform: scale(1.05);
	}
`;

export const PokemonLink = styled(Link)`
	text-decoration: none;
  color: black;
`;

export const SearchBar = styled.div`
  display: flex;
  border-radius: 10px;
  border: 1px solid #bdbdbd;
  padding: 4px 8px;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  padding-left: 8px;
`;

export const SearchIcon = styled.div`
  color: #bdbdbd;
`;
