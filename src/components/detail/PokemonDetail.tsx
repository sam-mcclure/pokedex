import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { pokemonInfoCache } from '../../utils/caches';
import { Pokemon } from '../../utils/commonTypes';
import { addPokemonToBag, isPokemonInBag, removePokemonFromBag } from '../../utils/localStorageHandlers';
import { PrimaryButton } from '../common/GenericStyles';
import Spinner from '../common/Spinner';
import { DetailContainer, FlexDiv, InfoItemDiv, PokemonImage } from './PokemonDetailStyles';

const genericDescription = "This is the greatest Pokemon that has ever lived. If you don't have one, you need to go out and catch it right now"

const getinitialPokemonState = (id: string | undefined): null | Pokemon => {
  if (!id || !pokemonInfoCache[id]) {
    return null;
  } else {
    return pokemonInfoCache[id];
  }
}

const getInitialPokemonBagState = (id: string | undefined): boolean => {
  if (id) {
    return isPokemonInBag(id);
  }
  return false;
}

const PokemonDetail = ():React.ReactElement => {
  const pokemonId = useParams().id;
  const [ pokemon, updatePokemon ] = useState<null | Pokemon>(getinitialPokemonState(pokemonId));
  const [ isPokemonInBag, updateIsPokemonInBag ] = useState<boolean>(getInitialPokemonBagState(pokemonId))

  useEffect(() => {
    // Don't fetch if already in cache
    if (!pokemonId || pokemonInfoCache[pokemonId]) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
			.then((res) => res.json())
			.then((res) => {
				pokemonInfoCache[pokemonId] = res;
				updatePokemon(res);
			})
			.catch((err) => console.log(err));
  }, [pokemonId])

  const togglePokemonInBag = () => {
    if (!pokemonId) return;

    if (isPokemonInBag) {
      removePokemonFromBag(pokemonId);
      updateIsPokemonInBag(false);
    } else {
      addPokemonToBag(pokemonId);
      updateIsPokemonInBag(true);
    }
  }
  
  if (pokemon) {
    return (
			<DetailContainer>
        <FlexDiv>
          <PokemonImage
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name}`}
          />
          <InfoItemDiv>{pokemon.name}</InfoItemDiv>
        </FlexDiv>
        <div>
          <InfoItemDiv>Height {pokemon.height}</InfoItemDiv>
          <InfoItemDiv>Weight {pokemon.weight}</InfoItemDiv>
          <InfoItemDiv>
            In Bag{" "}
            <input type="checkbox" checked={isPokemonInBag} onChange={togglePokemonInBag} />
          </InfoItemDiv>
          <InfoItemDiv>
            Type {pokemon.types.map((typeItem) => typeItem.type.name + " ")}
          </InfoItemDiv>
          <InfoItemDiv>{genericDescription}</InfoItemDiv>
          <InfoItemDiv>
            Abilities{" "}
            {pokemon.abilities.map(
              (abilityItem) => abilityItem.ability.name + " "
            )}
          </InfoItemDiv>
        </div>
        <Link to="/">
          <PrimaryButton type="button">Back</PrimaryButton>
        </Link>
			</DetailContainer>
		);
  } else {
    return (
      <Spinner />
		);
  }
}

export default PokemonDetail;
