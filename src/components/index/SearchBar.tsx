import React from "react";
import styled from "styled-components";


export const SearchBarContainer = styled.div`
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

interface SearchBarProps {
	searchTerm: string;
	updateSearchTerm: (term: string) => void;
}

const SearchBar = ({
	searchTerm,
	updateSearchTerm,
}: SearchBarProps): React.ReactElement => (
	<SearchBarContainer>
		<SearchIcon>
			<i className="fas fa-search"></i>
		</SearchIcon>
		<SearchInput
			type="text"
			placeholder="Search"
			value={searchTerm}
			onChange={(e) => updateSearchTerm(e.target.value)}
		/>
	</SearchBarContainer>
);

export default SearchBar
