import React from "react";
import styled from "styled-components";
import { PokemonFilter } from "../../utils/commonTypes";

interface FilterButtonProps extends React.HTMLProps<HTMLButtonElement> {
	selected: boolean;
}

export const FilterButton = styled.button`
	background-color: ${(props: FilterButtonProps) =>
		props.selected ? "#8ab4f0" : "#fafafa"};
	border: 1px solid #bdbdbd;
	cursor: pointer;
`;

export const ButtonGroup = styled.div`
	margin-bottom: 20px;
`;

interface FilterButtonsProps {
	selectedFilter: PokemonFilter;
	updateSelectedFilter: (filter: PokemonFilter) => void;
}

const FilterButtons = ({
	selectedFilter,
	updateSelectedFilter,
}: FilterButtonsProps): React.ReactElement => (
	<ButtonGroup>
		<FilterButton
			selected={selectedFilter === "all"}
			onClick={() => updateSelectedFilter("all")}
		>
			All
		</FilterButton>
		<FilterButton
			selected={selectedFilter === "bag"}
			onClick={() => updateSelectedFilter("bag")}
		>
			Bag
		</FilterButton>
	</ButtonGroup>
);

export default FilterButtons;
