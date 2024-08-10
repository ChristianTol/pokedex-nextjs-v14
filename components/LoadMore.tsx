"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import pokeball from "../public/pokeball-2.png";
import { useInView } from "react-intersection-observer";
import { fetchPokemon } from "@/app/action";

let offset = 10;
let limit = 1024;

export type PokemonCard = JSX.Element;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<PokemonCard[]>([]);

  useEffect(() => {
    if (inView && offset <= limit) {
      const itemsToFetch = offset + 10 <= limit ? 10 : limit - offset + 1;
      
      fetchPokemon(offset, itemsToFetch)
        .then((res) => {
          setData((prevData) => [...prevData, ...res]);
          offset += itemsToFetch;
        });
    }
  }, [inView, data]);

  return (
    <>
    <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-10">
        {data}
    </section>
    {offset <= limit && (
      <section className="flex justify-center items-center">
      <figure ref={ref} className="animate-[spin_4s_infinite]">
        <Image src={pokeball} alt="Loading..." height={80} width={80} />
      </figure>
    </section>
    )}
    </>
  );
}

export default LoadMore;