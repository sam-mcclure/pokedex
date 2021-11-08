import { Link } from "react-router-dom";
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
`;

export const PokemonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px 0px;
	border-radius: 8px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

	:hover {
		background-color: rgba(241, 241, 241, 1);
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
  background-color: white;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  padding-left: 8px;
`;

export const SearchIcon = styled.div`
  color: #bdbdbd;
`;

interface FilterButtonProps extends React.HTMLProps<HTMLButtonElement> {
  selected: boolean,
}

export const FilterButton = styled.button`
  background-color: ${(props: FilterButtonProps) => props.selected ? '#8ab4f0' : '#fafafa'};
  border: 1px solid #bdbdbd;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  margin-bottom: 20px;
`;

export const NoResultsCard = styled.div`
	background-color: white;
	border-radius: 8px;
  padding: 25px;
  margin-top: 25px;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
