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
        <h1 className="title pb-2">Ingressos</h1>

        <div className="flex pb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Ingressos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <p>Qual das partes abaixo você deseja visualizar?</p>
        <div className="flex container items-center font-bold text-2xl gap-5 mx-auto py-10">
          <Link href={"/ingressos/gerenciar"}>
            <span className="hover:opacity-80 hover:underline">Gerenciar ingressos</span>
          </Link>
          <Link href={"/ingressos/comprar"}>
            <span className="hover:opacity-80 hover:underline">Comprar ingresso</span>
          </Link>
        </div>
      </section>
    </>
  );
}
