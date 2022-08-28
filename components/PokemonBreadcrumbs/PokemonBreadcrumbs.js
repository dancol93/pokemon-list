import React from 'react'
import { Breadcrumbs, Typography } from '@mui/material'
import Link from 'next/Link'

const PokemonBreadcrumbs = ({ name }) => {
  const breadcrumbs = [
    <Link key='1' href='/' underline='hover'>Pokemon list</Link>,
    <Typography key='2' fontWeight='bolder'>
      {name}
    </Typography>
  ]

  return (
    <Breadcrumbs separator='>' aria-label='breadcrumb'>
      {breadcrumbs}
    </Breadcrumbs>
  )
}

export default PokemonBreadcrumbs
