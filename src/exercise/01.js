// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {createResource} from '../utils'
import {
  fetchPokemon,
  PokemonErrorBoundary,
  PokemonDataView,
  PokemonInfoFallback,
} from '../pokemon'

const manualCreateResource = promise => {
  let status = 'loading'
  let result = promise.then(
    resolved => {
      status = 'resolved'
      result = resolved
    },
    rejected => {
      status = 'rejected'
      result = rejected
    },
  )

  return {
    read() {
      if (status === 'loading') {
        throw result
      }

      if (status === 'rejected') {
        throw result
      }

      if (status === 'resolved') {
        return result
      }

      throw new Error('This is impossible')
    },
  }
}

const pokemonName = 'pikachus'
const pokemonResource = createResource(fetchPokemon(pokemonName))

function PokemonInfo() {
  const pokemon = pokemonResource.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          <React.Suspense fallback={<PokemonInfoFallback name={pokemonName} />}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
