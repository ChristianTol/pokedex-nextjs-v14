import LoadMore from "@/components/LoadMore";
import Image from "next/image";
import { fetchPokemon } from "./action";
import Head from "next/head";
import Link from "next/link";

async function Home() {
  const data = await fetchPokemon(0, 10);

  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>

      <header className="bg-slate-900 py-10 mb-10">
        <Link href="/" passHref>
          <h1 className="text-6xl text-center text-amber-400">Pokedex</h1>
        </Link>
      </header>

      <main className="container mx-auto mb-10">
      <section className="grid grid-cols-2 gap-5 mx-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-10" style={{ marginBottom: '2.5rem' }}>
        {data}
      </section>
      <LoadMore />
    </main>
    </>
  );
}

export default Home;
