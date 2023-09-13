"use client"

import {useState} from "react";
import {Input} from "@/components/ui/input";
import PokemonCard from "@/components/pokemon/PokemonCard";
import {getPokemonList} from "@/lib/sourceData/getPokemonList";
import {useQuery} from "@tanstack/react-query";
import Pagination, {PaginationProps} from 'rc-pagination';
import {Button} from "@/components/ui/button";
import {getPokemon} from "@/lib/sourceData/getPokemon";


export default function PokemonListContainer() {
    const [page, setPage] = useState<number>(0)

    const changePage: PaginationProps['onChange'] = (page) => {
        // console.log("🌍 pagination", page)
        setPage(page)
    };
    const [searchText, setSearchText] = useState<string>("")
    const {data, isLoading} = useQuery({
        keepPreviousData: true,
        queryKey: ["pokemons", page],
        queryFn: async () => {
            const offset = page <= 1 ? 0 : (page - 1) * 20
            console.log("🌍 offset", offset)
            return getPokemonList(`/pokemon?limit=20&offset=${offset}`)
        },
        onSettled: (data1, error) => {
        }
    })

    const {data: pokemonDetail} = useQuery({
        queryKey: [{searchText}],
        queryFn: async () => {
            return getPokemon(searchText)
        },
        onSettled: (data1, error) => {
            console.log("🌍 search", data1)
            // console.log("🌍 pokemons error", error)
        }
    })


    const Paging = () => {
        return (
            <Pagination
                current={page}
                onChange={changePage}
                total={1020}
                pageSize={20}
                className={"flex gap-x-2"}
                itemRender={(page1, type, element) => {
                    if (type === "page") {
                        return (
                            <Button
                                className={`${page1 === page && ('bg-slate-400')}`}
                            >
                                {page1}
                            </Button>
                        )
                    }
                }}
            />
        )
    }

    return (
        <div className={"flex flex-col gap-5"}>
            <Input
                type={"text"}
                value={searchText}
                id={"pokemonName"}
                placeholder={"Search Pokemon"}
                onChange={(e) => setSearchText(e.target.value)}
            />
            {
                pokemonDetail?.name
                    ? (
                        <PokemonCard name={pokemonDetail.name}/>
                    )
                    : (
                        <>
                            <Paging/>
                            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"}>
                                {data?.results.map((pokemon) => {
                                    return (
                                        <PokemonCard name={pokemon.name} key={pokemon.name}/>
                                    )
                                })}
                            </div>
                            <Paging/>
                        </>
                    )
            }


        </div>
    )
}
