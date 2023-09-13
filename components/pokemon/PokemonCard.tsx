import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {getPokemon} from "@/lib/sourceData/getPokemon";
import PokemonImage from "@/components/pokemon/PokemonImage";

interface PokemonCardProps {
    name: string
}

export default function PokemonCard({name}: PokemonCardProps) {
    const {data} = useQuery({
        queryKey: [{name}],
        queryFn: async () => {
            return getPokemon(name)
        },
        onSettled: (data1, error) => {
            console.log("🌍 pokemons", data1)
            console.log("🌍 pokemons error", error)
        }
    })

    return (
        <Link
            href={name}
            key={name}
        >
            <Card className={"transition ease-in-out delay-75 hover:scale-110 flex flex-col justify-center items-center"}>
                <CardHeader>
                    <CardTitle className={"capitalize"}>{name}</CardTitle>
                </CardHeader>
                {data && (
                    <CardContent className={"relative w-52 h-52"}>
                        <PokemonImage image={data?.sprites.other.home.front_default} name={name}/>
                    </CardContent>
                )}

            </Card>
        </Link>
    )
}
