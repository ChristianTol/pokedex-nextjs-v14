"use server";

import PokemonCard, { PokemonProp } from "@/components/PokemonCard";

// Define the structure for the API response
interface PokemonListResponse {
  results: Array<{ name: string; url: string }>;
}

export const fetchPokemon = async (offset: number, limit: number) => {
  // Fetch the list of Pokémon
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data: PokemonListResponse = await response.json();

  // Fetch details for each Pokémon in parallel
  const pokemonDetailsPromises = data.results.map(async (item, index) => {
    const detailsResponse = await fetch(item.url);
    const details: PokemonProp = await detailsResponse.json();

    return <PokemonCard key={details.id} pokemon={details} index={offset + index + 1} />;
  });

  // Wait for all detail fetches to complete
  const pokemonCards = await Promise.all(pokemonDetailsPromises);

  return pokemonCards;
};
