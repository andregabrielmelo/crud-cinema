import { DataTable } from "@/components/DataTable";
import AddVenda from "./vendaForm";
import { columns } from "./columns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getVendas } from "@/lib/db";

export default async function Home() {
  const data = await getVendas(0);

  return (
    <>
      <section className="container mx-auto py-2">
        <h1 className="title pb-2">Vendas</h1>
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
                <BreadcrumbPage>Vendas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>

        <div className="container mx-auto py-2">
          <AddVenda />
        </div>
      </section>
    </>
  );
}
