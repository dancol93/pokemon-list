import { capitalize } from '@mui/material'

export const convertToTitleCase = name => (
  name.split('-').map(word => capitalize(word)).join(' ')
)
