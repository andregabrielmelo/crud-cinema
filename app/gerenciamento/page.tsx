import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section className="container mx-auto py-2">
        <h1 className="heading">Gerenciamento</h1>
        <div className="flex container items-center font-bold text-2xl gap-5 mx-auto py-10">
          <Link href={"/gerenciamento/cinema"}>
            <span className="hover:opacity-80 hover:underline">Cinema</span>
          </Link>
          <Link href={"/gerenciamento/filmes"}>
            <span className="hover:opacity-80 hover:underline">Filmes</span>
          </Link>
        </div>
      </section>
    </>
  );
}
