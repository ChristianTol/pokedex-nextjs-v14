"use client";

import Image from "next/image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { capitalizeFirstLetter } from "../helper/helper";
import React, { useState } from "react";
import { TYPE_COLORS, TYPE_SECONDARY_COLORS } from "../constants/constants";
import { MotionDiv } from "./MotionDiv";

export interface PokemonProp {
  id: number;
  name: string;
  url: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      }
    }
  }
  types: any
}

interface Prop {
  pokemon: PokemonProp;
  index: number;
}

interface PokemonType {
  type: {
    name: keyof typeof TYPE_COLORS;
  };
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

function PokemonCard({pokemon, index}: Prop) {
  const pokeIndex = ("000" + pokemon.id).slice(pokemon.id > 999 ? -4 : -3);
  const [shiny, setShiny] = useState(false);
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  const typeColorGradient = getTypeColorGradient(pokemon.types);

  return (
    <MotionDiv
    variants={variants}
    initial="hidden"
    animate="visible"
    transition={{
      delay: index * 0.1,
      ease: 'easeInOut',
      duration: 0.5
    }}
    viewport={{ amount: 0 }}
    >
      <div
      className="rounded-md p-5 hover:scale-110 ease-in-out duration-200 flex flex-col justify-center items-center relative cursor-pointer shadow"
      style={{
        background: `radial-gradient(circle at top, ${typeColorGradient[0]} 35%, ${typeColorGradient[1]}) 100%`,
      }}
    >
      <button
        onClick={() => setShiny(!shiny)}
        className="absolute top-1 right-1 rounded-md flex"
      >
        <Image
          src={shiny ? "/sparkles-shiny.png" : "/sparkles-white.png"}
          alt="shiny"
          width={35}
          height={35}
        />
      </button>
      <span className="absolute text-2xl top-1 left-3 font-bold">No. {pokeIndex}</span>
        <div>
          <LazyLoadImage
            className="w-[180px] h-[180px] md:w-[250px] sm:h-[250px]"
            src={
            shiny
              ? pokemon.sprites.other["official-artwork"].front_shiny
              : pokemon.sprites.other["official-artwork"].front_default
            }
            alt={pokemon.name}
            effect="blur"
          />
        </div>
          <div className="gap-2 my-2 flex md:block xl:flex">
          {pokemon.types?.map((type: any, index: number) => (
            <span
              key={type.type.name}
              className={`px-2 py-0 md:py-3 rounded flex items-center justify-center sm:py-1 sm:gap-1
              ${isMobile && type.type.name}`}
            >
              <div className="md:hidden">
                <Image
                  src={`/icons/${type.type.name}.svg`}
                  alt={`${type.type.name}`}
                  width={15}
                  height={15}
                />
              </div>
              <div className="hidden md:flex">
                <div
                  className={`${type.type.name} rounded-l m-[-8px] [clip-path:polygon(0%_0%,100%_0%,80%_100%,0%_100%)]`}
                >
                  <div className="h-[32px] w-[45px] flex items-center justify-center pr-[10px]">
                    <Image
                      className=""
                      src={`/icons/${type.type.name}.svg`}
                      alt={`${type.type.name}`}
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                <div
                  className={`h-[32px] w-[90px] flex items-center justify-center m-[-8px] rounded-r ${type.type.name}-text font-bold [clip-path:polygon(10%_0%,100%_0%,100%_100%,0%_100%)]`}
                >
                  <p className="hidden md:inline uppercase px-[8px]">
                    {capitalizeFirstLetter(type.type.name)}
                  </p>
                </div>
              </div>
            </span>
          ))}
        </div>
        <span className="font-semibold tracking-wider text-yellow">
          {capitalizeFirstLetter(pokemon.name)}
        </span>
      </div>
    </MotionDiv>
  );
};

export const getTypeColorGradient = (typesArray: PokemonType[]) => {
  if (typesArray.length === 1) {
    return [
      TYPE_COLORS[typesArray[0].type.name],
      TYPE_SECONDARY_COLORS[typesArray[0].type.name],
    ];
  } else {
    return [
      TYPE_COLORS[typesArray[0].type.name],
      TYPE_COLORS[typesArray[1].type.name],
    ];
  }
};

export default PokemonCard;
