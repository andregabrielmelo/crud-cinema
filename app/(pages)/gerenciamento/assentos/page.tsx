import { DataTable } from "@/components/DataTable";
import AddAssento from "./assentoForm";
import { columns } from "./columns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Skeleton } from "@/components/ui/skeleton";

import EditModal from "@/components/editDialogs/editModal";

import { Suspense } from "react";
import { getAssentos } from "@/lib/db";

export default async function Home() {
  const data = await getAssentos(0);

  return (
    <>
      <section className="container mx-auto py-2">
        <h1 className="title pb-2">Assentos</h1>
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
                <BreadcrumbPage>Assentos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="container mx-auto py-10">
          <Suspense
            fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}
          >
            <DataTable columns={columns} data={data} />
          </Suspense>
        </div>

        <div className="container mx-auto py-2">
          <AddAssento />
        </div>
        <EditModal />
      </section>
    </>
  );
}
