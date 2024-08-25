import { useState } from 'react';
import './App.css';
import Pokemon from './components/Pokemon';
import LeftArrowIcon from './components/LeftArrowIcon';
import RightArrowIcon from './components/RightArrowIcon';
import { usePokemon } from './hooks/usePokemon';
import Card from './components/Card';

export default function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const { pokemon, error, isLoading } = usePokemon(pokemonId);

  return (
    <main>
      {pokemon ? (
        <Pokemon pokemon={pokemon} />
      ) : isLoading ? (
        <Card>
          <p>Loading Pokemon...</p>
        </Card>
      ) : (
        error && (
          <Card>
            <p>{error.message}</p>
          </Card>
        )
      )}

      <section>
        <button
          disabled={pokemonId < 2}
          onClick={() => setPokemonId((prevId) => prevId - 1)}>
          <LeftArrowIcon />
        </button>
        <button
          disabled={isLoading}
          onClick={() => setPokemonId((prevId) => prevId + 1)}>
          {isLoading ? <div className='loader'></div> : <RightArrowIcon />}
        </button>
      </section>
    </main>
  );
}
