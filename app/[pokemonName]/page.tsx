"use client"

import {useQuery} from "@tanstack/react-query";
import {getPokemon} from "@/lib/sourceData/getPokemon";
import PokemonImage from "@/components/pokemon/PokemonImage";
import {pokemonTypeColors} from "@/lib/typeColor";
import {Progress} from "@/components/ui/progress";
import Link from "next/link";
import {getSpecies} from "@/lib/sourceData/getSpecies";
import {Chain, EvolvesTo, getEvo} from "@/lib/sourceData/getEvo";
import PokemonCard from "@/components/pokemon/PokemonCard";

function PokemonPage({params}: { params: { pokemonName: string } }) {
  const {pokemonName} = params

  const {data} = useQuery({
    queryKey: [{pokemonName}],
    queryFn: async () => {
      return getPokemon(pokemonName)
    },
    onSettled: (data1, error) => {
      // console.log("🌍 pokemons", data1)
      // console.log("🌍 pokemons error", error)
    }
  })

  const {data: species} = useQuery({
    enabled: !!data?.name,
    queryKey: ["species", data?.name],
    queryFn: async () => {
      return getSpecies(data?.name as string)
    },
    onSettled: (data1, error) => {
      console.log("🌍 species", data1)
      console.log("🌍 species error", error)
    }
  })

  const {data: evos} = useQuery({
    enabled: !!species?.evolution_chain.url,
    queryFn: async () => {
      const evo = await getEvo(species?.evolution_chain.url as string)

      function extractEvolutionNames(evolutionChain: Chain): string[] {
        const names: string[] = [];

        function recursiveExtract(chain: EvolvesTo) {
          if (chain.species && chain.species.name) {
            names.push(chain.species.name);
          }

          if (chain.evolves_to && chain.evolves_to.length > 0) {
            for (const evolution of chain.evolves_to) {
              recursiveExtract(evolution);
            }
          }
        }

        recursiveExtract(evolutionChain);
        return names;
      }

      return extractEvolutionNames(evo?.chain as Chain)
    },
    onSettled: (data1, error) => {
      console.log("🌍 evos", data1)
      console.log("🌍 evos error", error)
    }
  })

  return (
    <div className={"flex flex-col m-8 gap-8"}>
      <Link href={"/"}>
        <h2>Back</h2>
      </Link>
      <div className={"flex flex-col items-center gap-8"}>
        {data ? (
          <div className={"flex flex-col gap-8"}>
            <div className={"flex flex-col lg:flex-row  gap-x-2 justify-between w-full items-center gap-8"}>
              <div className={"flex flex-col items-center gap-5"}>
                <p className={"text-xl font-semibold capitalize"}>{pokemonName}</p>
                <div className={"relative w-52 h-52"}>
                  <PokemonImage
                    image={data?.sprites.other.home.front_default ?? data?.sprites.front_default}
                    name={pokemonName}
                  />
                </div>
                <div className={"mt-2 flex gap-x-2"}>
                  {data.types.map((item) => {
                    const name = item?.type.name
                    return (
                      <div
                        className={`capitalize rounded rounded-box p-4 bg-[${pokemonTypeColors[name]}]  h-min`}
                        style={{
                          backgroundColor: pokemonTypeColors[name]
                        }}
                      >
                        <p
                          className={``}
                        >
                          {name}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className={"flex flex-col"}>
                {data.stats.map((stat) => {

                  const name = stat.stat.name
                  const value = stat.base_stat
                  return (
                    <div className={"flex items-stretch w-[500px]"} key={name}>
                      <h3 className={"p-3 w-2/4 capitalize"}>{name}: {value}</h3>
                      <Progress className={"w-2/4 m-auto"} value={value}/>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={"flex w-full justify-center m-y-8 bg-slate-200 border border-slate-400 rounded rounded-box p-8"}>
            <p className={"break-words max-w-md text-center text-black"}>{species?.flavor_text_entries[0].flavor_text}</p>
            </div>
            <div className={"flex flex-col gap-y-4 w-full items-center"}>
              <h2 className={"text-lg font-semibold"}>Evolutions</h2>
              {evos && evos.length > 1 ? (
                <div className="grid grid-flow-col auto-cols-max hover:auto-cols-min">
                  {evos.map((evo) => {
                    return <PokemonCard name={evo} key={evo}/>
                  })}
                </div>
              ) : (<p>No Evolutions</p>)}

            </div>
          </div>
        ) : (<p>no data</p>)}
      </div>

    </div>
  )
}

export default PokemonPage
