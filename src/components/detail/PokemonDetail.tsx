import React from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail = ():React.ReactElement => {
  const params = useParams();

  return (
    <div>{params.id}</div>
  )
}

export default PokemonDetail;
