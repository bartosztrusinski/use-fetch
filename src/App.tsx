import { useState } from 'react';
import './App.css';
import Pokemon from './components/Pokemon';
import LeftArrowIcon from './components/LeftArrowIcon';
import RightArrowIcon from './components/RightArrowIcon';

export default function App() {
  const [pokemonId, setPokemonId] = useState(1);

  return (
    <main>
      <Pokemon pokemonId={pokemonId} />
      <section>
        <button
          disabled={pokemonId < 2}
          onClick={() => setPokemonId((prevId) => prevId - 1)}>
          <LeftArrowIcon />
        </button>
        <button onClick={() => setPokemonId((prevId) => prevId + 1)}>
          <RightArrowIcon />
        </button>
      </section>
    </main>
  );
}
