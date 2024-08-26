import { useState } from 'react';
import './App.css';
import Pokemon from './components/Pokemon';
import LeftArrowIcon from './components/LeftArrowIcon';
import RightArrowIcon from './components/RightArrowIcon';
import Card from './components/Card';
import { usePokemon } from './hooks/usePokemon';
import { useDebounce } from './hooks/useDebounce';

export default function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const { pokemon, error, isLoading } = usePokemon(pokemonId);
  const debouncedIsLoading = useDebounce(isLoading, 200);

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
          disabled={debouncedIsLoading}
          onClick={() => setPokemonId((prevId) => prevId + 1)}>
          {debouncedIsLoading ? (
            <div className='loader'></div>
          ) : (
            <RightArrowIcon />
          )}
        </button>
      </section>
    </main>
  );
}
