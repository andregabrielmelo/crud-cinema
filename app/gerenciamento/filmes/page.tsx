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
  const columns = getColumns("sessoes");

  // Fetch data and update columns whenever the selected value changes
  React.useEffect(() => {
    axios
      .get("/api/sessoes", {
        headers: { cursor: 0 },
      })
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <>
      <section className="container mx-auto py-2">
        <h1 className="title pb-2">Filmes</h1>

        <div className="flex pb-7">
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
                <BreadcrumbPage>Filmes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="container mx-auto py-2">
          <DataTable columns={columns} data={data} />
        </div>
        <div className="container mx-auto py-2">
          <AddSessao />
        </div>
        <EditModal />
      </section>
    </>
  );
}
