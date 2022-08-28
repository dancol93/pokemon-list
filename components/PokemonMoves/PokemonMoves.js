import React from 'react'
import { Chip, Typography } from '@mui/material'
import Cancel from "@mui/icons-material/Cancel";

import { convertToTitleCase } from '../../utils/convertToTitleCase'

import styles from './PokemonMoves.module.scss'

const PokemonMoves = ({ moves, pokemonName, onDeleteMove }) => (
  <div className={styles.container}>
    {moves.length ? (
      <>
        <Typography className={styles.title} variant='h3'>Moves list</Typography>
        {moves.map(({ move }) => (
          <Chip
            key={move.name}
            className={styles.move}
            deleteIcon={<Cancel className={styles.icon} />}
            label={convertToTitleCase(move.name)}
            onDelete={() => onDeleteMove(move.name)}
          />
        ))}
      </>
    ) : (
      <Typography variant='h5'>{pokemonName} has no moves to be shown</Typography>
    )}
  </div>
)

export default PokemonMoves
