"use client"

import {useState} from "react";
import {Input} from "@/components/ui/input";
import PokemonCard from "@/components/pokemon/PokemonCard";
import {getPokemonList} from "@/lib/sourceData/getPokemonList";
import {useQuery} from "@tanstack/react-query";
import Pagination, {PaginationProps} from 'rc-pagination';
import {Button} from "@/components/ui/button";


export default function PokemonListContainer() {
    const [page, setPage] = useState<number>(1)
    const changePage: PaginationProps['onChange'] = (page) => {
        setPage(page);
    };
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


    return (
        <div className={"flex flex-col gap-5"}>
            <Input
                type={"text"}
                value={searchText}
                id={"pokemonName"}
                placeholder={"Search Pokemon"}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Pagination
                current={page}
                onChange={changePage}
                total={data?.count}
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
            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"}>
                {data?.results.map((pokemon) => {
                    return (
                        <PokemonCard name={pokemon.name} key={pokemon.name}/>
                    )
                })}
            </div>
            <Pagination
                current={page}
                onChange={changePage}
                total={data?.count}
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
        </div>
    )
}
