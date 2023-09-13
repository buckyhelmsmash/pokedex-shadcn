"use client"

import {useQuery} from "@tanstack/react-query";
import {getPokemon} from "@/lib/sourceData/getPokemon";
import PokemonImage from "@/components/pokemon/PokemonImage";
import {pokemonTypeColors} from "@/lib/typeColor";
import {Progress} from "@/components/ui/progress";

function PokemonPage({params}: { params: { pokemonName: string } }) {
    const {pokemonName} = params

    const {data} = useQuery({
        queryKey: [{pokemonName}],
        queryFn: async () => {
            return getPokemon(pokemonName)
        },
        onSettled: (data1, error) => {
            console.log("🌍 pokemons", data1)
            // console.log("🌍 pokemons error", error)
        }
    })

    return (
        <div className={"flex flex-col m-8"}>
            <div className={"flex flex-col items-center"}>
                {data ? (
                    <div className={"flex gap-x-2 justify-between w-full"}>
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
                                return(
                                    <div className={"flex items-stretch w-[500px]"} key={name}>
                                        <h3 className={"p-3 w-2/4 capitalize"}>{name}: {value}</h3>
                                        <Progress className={"w-2/4 m-auto"} value={value}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (<p>no data</p>)}
            </div>

        </div>
    )
}

export default PokemonPage
