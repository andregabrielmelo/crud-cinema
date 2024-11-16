export default function Home() {
  return (
    <>
      <section className="container mx-auto py-2">
        <h1 className="heading pb-2">
          Bem vindo ao
          <span className="font-black text-sky-400 text-5xl pl-2">
            GoodCinema!
          </span>
        </h1>
        <p>
          Aqui você pode gerenciar os filmes, salas e sessões do seu cinema.
          <br />
          Além disso, você pode visualizar os produtos e os ingressos vendidos.
          <br />É um CRUD básico para gerenciamento do cinema.
        </p>
      </section>
    </>
  );
}
