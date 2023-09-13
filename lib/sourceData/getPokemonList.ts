import {POKEMON_API} from "@/lib/constats";


export interface IPokemonList {
  count: number
  next: string | null
  previous: string | null
  results: PokemonData[]
}

export interface PokemonData {
  name: string
  url: string
}


export async function getPokemonList(url: string): Promise<IPokemonList>{
  const response = await fetch(POKEMON_API + url)
  const data: Promise<IPokemonList> =  await response.json()
  // console.log("🌍 data", data)
  return data
}


