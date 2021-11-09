import styled from "styled-components";

export const CenteredDiv = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -50px;
	margin-left: -50px;
`;

export const PrimaryButton = styled.button`
	border: none;
	outline: none;
	background-color: #8ab4f0;
	padding: 5px 12px;
	border-radius: 5px;
	cursor: pointer;
	margin-right: 16px;
	font-weight: bold;
	color: white;

  :hover {
    filter: brightness(95%);
  }
`;
