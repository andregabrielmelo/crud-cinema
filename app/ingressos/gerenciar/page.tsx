"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/DataTable";
import axios from "axios";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { ColumnDef } from "@tanstack/react-table";
import getColumns from "@/lib/columns";
import type { GenericData, TableName } from "@/lib/definitions";
import EditModal from "@/components/editDialogs/editModal";
import { useTableData } from "@/lib/useTableData";
import AddSessao from "@/forms/addSessao";

export default function Home() {
  const { data, setData } = useTableData();
  const columns = getColumns("ingressos");

  // Fetch data and update columns whenever the selected value changes
  React.useEffect(() => {
    axios.get("/api/ingressos").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <>
      <section className="container mx-auto py-2">
        <h1 className="title pb-2">Gerenciar ingressos</h1>

        <div className="flex pb-7">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/ingressos">Ingressos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Gerenciar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="container mx-auto py-2">
          <DataTable columns={columns} data={data} />
        </div>
        <EditModal />
      </section>
    </>
  );
}
