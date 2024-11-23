// import EditModal from "@/components/editDialogs/editModal";
import { DataTable } from "@/components/DataTable";
import AddProduto from "./produtoForm";
import { columns } from "./columns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getProdutos } from "@/lib/db";

export default async function Home() {
  // const { editModal } = useTableData();
  const data = await getProdutos(0);

  return (
    <>
      <section className="container mx-auto py-2">
        <h1 className="title pb-2">Produtos</h1>
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
                <BreadcrumbPage>Produtos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>

        {/* <EditModal />  */}

        <div className="container mx-auto py-2">
          <AddProduto />
        </div>
      </section>
    </>
  );
}
