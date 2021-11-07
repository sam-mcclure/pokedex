import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const SpinnerContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -50px;
	margin-left: -50px;
`;

const Spinner = (): React.ReactElement => (
  <SpinnerContainer>
    <Loader type="TailSpin" color="#f1f1f1" />
  </SpinnerContainer>
);

export default Spinner;
