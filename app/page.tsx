import PokemonListContainer from "@/components/pokemon/PokemonListContainer";
import React from "react";
import PokemonList from "@/components/pokemon/PokemonList";


export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Welcome to TypeMaster PokeDex
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Your ultimate destination for exploring Pokémon by their unique types!
        </p>
      </div>
      <div>
        <PokemonListContainer />
      </div>
    </section>
  )
}
