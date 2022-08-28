import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { PokemonDetails } from '../../components'
import pokemonDetailsMock from '../fixtures/pokemonDetails'

test('renders the pokemon details', () => {
  const { getByTestId, getAllByTestId } = render(<PokemonDetails pokemonDetails={pokemonDetailsMock} />)
  expect(getByTestId('pokemon-name')).toHaveTextContent(pokemonDetailsMock.name)
  expect(getAllByTestId('pokemon-forms')).toHaveLength(pokemonDetailsMock.forms.length)
  expect(getAllByTestId('pokemon-ability')).toHaveLength(pokemonDetailsMock.abilities.filter(ability => !ability.is_hidden).length)
})