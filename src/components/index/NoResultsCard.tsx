import React from 'react';
import styled from 'styled-components';

const NoResultsContainer = styled.div`
	background-color: white;
	border-radius: 8px;
	padding: 25px;
	margin-top: 25px;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const NoResultsCard = (): React.ReactElement => (
	<NoResultsContainer>No Results Found</NoResultsContainer>
);

export default NoResultsCard;
