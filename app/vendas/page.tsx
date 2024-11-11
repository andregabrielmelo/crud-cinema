import { columns } from "@/app/vendas/columns";
import { DataTable } from "@/components/DataTable";
import { getData } from "@/lib/db";

export default async function Home() {
  const data = await getData();

  return (
    <>
      <section className="container mx-auto py-2">
        <h1 className="heading">Vendas</h1>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </section>
    </>
  );
}
