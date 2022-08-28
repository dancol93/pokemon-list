import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { PokemonMoves } from '../../components'
import pokemonMovesMock from '../fixtures/pokemonMoves.json'

test('renders the pokemon moves', () => {
  const { getAllByTestId } = render(<PokemonMoves moves={pokemonMovesMock} />)
  expect(getAllByTestId('pokemon-move')).toHaveLength(pokemonMovesMock.length)
})

test('rendes a generic message if no moves are found', () => {
  const { getByTestId } = render(<PokemonMoves moves={[]} pokemonName='Abomasnow' />)
  expect(getByTestId('no-moves-message')).toHaveTextContent('Abomasnow has no moves to be shown')
})