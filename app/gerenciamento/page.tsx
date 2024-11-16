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
                <BreadcrumbPage>Vendas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <p>Qual das partes abaixo você deseja visualizar?</p>
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
