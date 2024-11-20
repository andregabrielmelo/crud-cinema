import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function Home() {
  return (
    <>
      <section className="container mx-auto py-2">
        <h1 className="title pb-2">Gerenciamento</h1>

        <div className="flex pb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Gerenciamento</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <p>Qual das partes abaixo você deseja visualizar?</p>
        <div className="flex container items-center font-bold text-2xl gap-5 mx-auto py-10">
          <Link href={"/gerenciamento/assentos"}>
            <span className="hover:opacity-80 hover:underline">Assentos</span>
          </Link>
          <Link href={"/gerenciamento/ingressos"}>
            <span className="hover:opacity-80 hover:underline">Ingressos</span>
          </Link>
          <Link href={"/gerenciamento/produtos"}>
            <span className="hover:opacity-80 hover:underline">Produtos</span>
          </Link>
          <Link href={"/gerenciamento/salas"}>
            <span className="hover:opacity-80 hover:underline">Salas</span>
          </Link>
          <Link href={"/gerenciamento/sessoes"}>
            <span className="hover:opacity-80 hover:underline">Sessoes</span>
          </Link>
          <Link href={"/gerenciamento/vendas"}>
            <span className="hover:opacity-80 hover:underline">Vendas</span>
          </Link>
        </div>
      </section>
    </>
  );
}
