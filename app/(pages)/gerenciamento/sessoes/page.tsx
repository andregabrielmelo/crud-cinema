import { DataTable } from "@/components/DataTable";
import AddSessao from "./sessaoForm";
import { columns } from "./columns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getSessoes } from "@/lib/db";

export default async function Home() {
  const data = await getSessoes(0);

  return (
    <>
      <section className="container mx-auto py-2">
        <h1 className="title pb-2">Sessoes</h1>
        <div className="flex">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/gerenciamento">
                  Gerenciamento
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Sessoes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>

        <div className="container mx-auto py-2">
          <AddSessao />
        </div>
      </section>
    </>
  );
}
