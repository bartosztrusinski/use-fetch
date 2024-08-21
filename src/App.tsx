import { useState } from 'react';
import { useFetch } from './useFetch';
import './App.css';

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
};

export default function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const {
    data: pokemon,
    isLoading,
    error,
  } = useFetch<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

  if (isLoading || !pokemon) {
    return <h1>Loading Pokemon...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  console.log(pokemon);

  return (
    <main>
      <figure>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <figcaption>
          <h1>{pokemon.name}</h1>
        </figcaption>
      </figure>
      <button
        disabled={pokemonId < 2}
        onClick={() => setPokemonId((prevId) => prevId - 1)}>
        Prev
      </button>
      <button onClick={() => setPokemonId((prevId) => prevId + 1)}>Next</button>
    </main>
  );
}
