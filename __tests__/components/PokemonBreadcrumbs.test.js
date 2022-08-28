import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { PokemonBreadcrumbs } from '../../components'

test('renders the breadcrumbs', () => {
  const { getByText } = render(<PokemonBreadcrumbs name='Pikachu' />)
  expect(getByText('Pikachu')).toBeInTheDocument()
})