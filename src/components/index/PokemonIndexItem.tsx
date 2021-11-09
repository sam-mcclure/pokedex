import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PokemonListItem } from "../../utils/commonTypes";

const PokemonIndexItemContainer = styled.div`
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

interface PokemonIndexItemProps {
	pokemon: PokemonListItem;
}

const PokemonIndexItem = ({
	pokemon,
}: PokemonIndexItemProps): React.ReactElement => (
	<PokemonLink to={`pokemon/${pokemon.id}`} key={pokemon.id}>
		<PokemonIndexItemContainer>
			<img src={pokemon.imageUrl} alt={pokemon.name} />
			<div>{pokemon.name}</div>
		</PokemonIndexItemContainer>
	</PokemonLink>
);

export default PokemonIndexItem;
