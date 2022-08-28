import React from 'react'

import { Chip, Typography, capitalize } from '@mui/material'
import Image from 'next/image'

import styles from './PokemonDetails.module.scss'
import { convertToTitleCase } from '../../utils/convertToTitleCase'

const PokemonDetails = ({ pokemonDetails }) => (
  <div className={styles.container}>
    <Typography data-testid='pokemon-name' variant='h3'>{pokemonDetails.name}</Typography>
    {pokemonDetails.image &&
      <Image
        alt={`${pokemonDetails.name}-picture`}
        data-testid='pokemon-image'
        height={192}
        layout='fixed'
        src={pokemonDetails.image}
        width={192}
      />
    }
    <Typography variant='h4'>Forms</Typography>
    {pokemonDetails.forms.map(form => (
      <div data-testid='pokemon-forms' key={form.id} className={styles.formInfo}>
        <div className={styles.basicInfo}>
          <Typography variant='h6'>Form ID:</Typography>
          <Chip label={form.id} sx={{ margin: '0 10px'}} />
        </div>
        <div className={styles.basicInfo}>
          <Typography variant='h6'>Form Name:</Typography>
          <Chip label={capitalize(form.name)} sx={{ margin: '0 10px'}} />
        </div>
        <div className={styles.basicInfo}>
          <Typography variant='h6'>Is only available in battles?: {form.is_battle_only ? 'YES' : 'NO'}</Typography>
        </div>
      </div>
    ))}
    <Typography variant='h4'>Abilities</Typography>
    <div className={styles.abilities}>
      {pokemonDetails.abilities.map(({ ability }) => (
        <Chip key={ability.name} data-testid='pokemon-ability' label={convertToTitleCase(ability.name)} sx={{ margin: '0 10px'}} />
      ))}
    </div>
  </div>
)

export default PokemonDetails
