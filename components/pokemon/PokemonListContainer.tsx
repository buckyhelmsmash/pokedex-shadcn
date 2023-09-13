"use client"

import {ReactNode, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import PokemonCard from "@/components/pokemon/PokemonCard";
import {getPokemonList} from "@/lib/sourceData/getPokemonList";
import {useQuery} from "@tanstack/react-query";

export default function PokemonListContainer (){

  const [searchText, setSearchText] = useState<string>("")
  const {data, isLoading} = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      return getPokemonList("/pokemon?limit=50&offset=0")
    },
    // onSettled: (data1, error) => {
    //   console.log("🌍 pokemons", data1)
    //   console.log("🌍 pokemons error", error)
    // }
  })


  return(
    <div className={"flex flex-col gap-5"}>
      <Input
        type={"text"}
        value={searchText}
        id={"pokemonName"}
        placeholder={"Search Pokemon"}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"}>
        {data?.results.map((pokemon) => {
          return(
            <PokemonCard name={pokemon.name} key={pokemon.name}/>
          )
        })}
      </div>
    </div>
  )
}
