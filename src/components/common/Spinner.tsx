import React from "react";
import Loader from "react-loader-spinner";
import { CenteredDiv } from "./GenericStyles";;

const Spinner = (): React.ReactElement => (
  <CenteredDiv>
    <Loader type="TailSpin" color="#f1f1f1" />
  </CenteredDiv>
);

export default Spinner;
