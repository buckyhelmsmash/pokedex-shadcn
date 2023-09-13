"use client"

import Image from "next/image";

const PokemonImage = ({image, name}: {image:string, name: string}) => {
    return(
        <Image
            src={image}
            alt={name}
            priority
            fill
            style={{objectFit: "contain"}}
            className={"transition-opacity opacity-0 duration-75"}
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
        />
    )
}

export default PokemonImage
