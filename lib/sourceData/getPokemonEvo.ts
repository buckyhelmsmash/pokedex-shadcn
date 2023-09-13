import {POKEMON_API} from "@/lib/constats";
import {IPokemonDetail} from "@/lib/sourceData/getPokemon";

export async function getPokemonEvo(id: number){
    const response = await fetch(POKEMON_API + `/evolution-chain/${id}`)
    // console.log("🌍 data", data)
    return await response.json()
}
