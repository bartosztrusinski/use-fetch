import './App.css';
import Pokemon from './components/Pokemon';
import LeftArrowIcon from './components/LeftArrowIcon';
import RightArrowIcon from './components/RightArrowIcon';
import Card from './components/Card';
import Loader from './components/Loader';
import { useState } from 'react';
import { usePokemon } from './hooks/usePokemon';
import { useDebounce } from './hooks/useDebounce';

export default function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const { pokemon, error, isLoading } = usePokemon(pokemonId);
  const debouncedIsLoading = useDebounce(isLoading, 150);
  const [isNextPokemon, setIsNextPokemon] = useState<boolean>();
  const isPrevPokemon = isNextPokemon === false;

  const handlePrevClick = () => {
    setPokemonId((prevId) => prevId - 1);
    setIsNextPokemon(false);
  };

  const handleNextClick = () => {
    setPokemonId((prevId) => prevId + 1);
    setIsNextPokemon(true);
  };

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
          disabled={(isLoading && isPrevPokemon) || pokemonId < 2}
          className={`isLoading ? 'loading' : ''`}
          onClick={handlePrevClick}>
          {debouncedIsLoading && isPrevPokemon ? <Loader /> : <LeftArrowIcon />}
        </button>
        <button
          disabled={isLoading && isNextPokemon}
          className={isLoading ? 'loading' : ''}
          onClick={handleNextClick}>
          {debouncedIsLoading && isNextPokemon ? (
            <Loader />
          ) : (
            <RightArrowIcon />
          )}
        </button>
      </section>
    </main>
  );
}
