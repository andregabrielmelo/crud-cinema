import React from "react";
import { DataTable } from "@/components/DataTable";
import { getData } from "@/lib/db";
import getColumns from "@/lib/columns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function Home() {
  const data = await getData("vendas");
  const columns = getColumns("vendas");

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
                <BreadcrumbPage>Vendas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </section>
    </>
  );
}
