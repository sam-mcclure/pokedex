import React from "react";
import styled from "styled-components";
import { PokemonFilter } from "../../utils/commonTypes";

interface FilterButtonProps extends React.HTMLProps<HTMLButtonElement> {
	selected: boolean;
}

const FilterButton = styled.button`
	background-color: ${(props: FilterButtonProps) =>
		props.selected ? "#8ab4f0" : "#fafafa"};
	color: ${(props: FilterButtonProps) =>
		props.selected ? "white" : "black"};
	border: 1px solid #bdbdbd;
	cursor: pointer;

	:hover {
		filter: brightness(95%);
	}
`;

const FilterButtonRight = styled(FilterButton)`
	border-top-right-radius: 8px;
	border-bottom-right-radius: 8px;
`;

const FilterButtonLeft = styled(FilterButton)`
	border-top-left-radius: 8px;
	border-bottom-left-radius: 8px;
`;

const ButtonGroup = styled.div`
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
		<FilterButtonLeft
			selected={selectedFilter === "all"}
			onClick={() => updateSelectedFilter("all")}
		>
			All
		</FilterButtonLeft>
		<FilterButtonRight
			selected={selectedFilter === "bag"}
			onClick={() => updateSelectedFilter("bag")}
		>
			Bag
		</FilterButtonRight>
	</ButtonGroup>
);

export default FilterButtons;
