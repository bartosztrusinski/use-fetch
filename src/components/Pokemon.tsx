import { useFetch } from '../hooks/useFetch';
import Card from './Card';
import './Pokemon.css';

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
};

type Props = {
  pokemonId: number;
};

export default function Pokemon({ pokemonId }: Props) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  const { data: pokemon, isLoading, error } = useFetch<Pokemon>(url);

  if (isLoading || !pokemon) {
    return (
      <Card>
        <p>Loading Pokemon...</p>;
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <p>{error.message}</p>
      </Card>
    );
  }

  return (
    <Card>
      <figure className='pokemon'>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <figcaption>
          <p>{pokemon.name}</p>
        </figcaption>
      </figure>
    </Card>
  );
}
