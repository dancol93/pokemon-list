import React, { useState } from 'react'
import { capitalize } from '@mui/material'

import { PokemonBreadcrumbs, PokemonDetails, PokemonMoves } from '../../components'

import styles from '../../styles/PokemonDetails.module.scss'

const Pokemon = ({ pokemonDetails, pokemonMoves }) => {
  const [moves, setMoves] = useState(pokemonMoves);

  const onDeleteMove = moveName => {
    setMoves(moves.filter(({ move }) => move.name !== moveName))
  }

  return (
    <>
      <div className={styles.container}>
        <PokemonBreadcrumbs name={pokemonDetails.name} />
        <PokemonDetails pokemonDetails={pokemonDetails} />
      </div>
      <PokemonMoves moves={moves} pokemonName={capitalize(pokemonDetails.name)} onDeleteMove={onDeleteMove} />
    </>
  )
}

export default Pokemon

export const getServerSideProps = async ({ params: { id }}) => {
  const pokemonDetailsRaw = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
  const pokemonForms = await Promise.all(
    pokemonDetailsRaw.forms.map(async form => fetch(form.url).then(res => res.json()))
  )

  const pokemonDetails = {
    abilities: pokemonDetailsRaw.abilities.filter(ability => !ability.is_hidden),
    image: pokemonDetailsRaw.sprites.back_default || pokemonDetailsRaw.sprites.front_default,
    forms: pokemonForms,
    name: capitalize(pokemonDetailsRaw.name),
  }

  return {
    props: {
      pokemonDetails,
      pokemonMoves: pokemonDetailsRaw.moves,
    }
  }
}