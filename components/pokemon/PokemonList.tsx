import PokemonCard from "@/components/pokemon/PokemonCard";
import { PokemonData } from "@/lib/sourceData/getPokemonList";

interface Props {
  data: PokemonData[]; // Assuming data is an array of PokemonData
}

export default function PokemonList({ data }: Props) {
  return (
    <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"}>
      {data.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} />
      ))}
    </div>
  );
}
