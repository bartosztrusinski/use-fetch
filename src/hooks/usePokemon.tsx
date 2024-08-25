import { useFetch } from './useFetch';

export type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
};

export function usePokemon(pokemonId: number) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  const { data: pokemon, isLoading, error } = useFetch<Pokemon>(url);

  return { pokemon, isLoading, error };
}
