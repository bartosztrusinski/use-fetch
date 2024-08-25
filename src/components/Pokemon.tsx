import Card from './Card';
import './Pokemon.css';
import type { Pokemon } from '../hooks/usePokemon';

type Props = {
  pokemon: Pokemon;
};

export default function Pokemon({ pokemon }: Props) {
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
