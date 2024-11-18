"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/DataTable";
import AddSessao from "@/forms/addSessao";
import AddIngresso from "@/forms/addIngresso";
import axios from "axios";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { ColumnDef } from "@tanstack/react-table";
import getColumns from "@/lib/columns";
import type { GenericData } from "@/lib/definitions";

export default function Home() {
  const placeholder = "Ingressos";

  const [selectedValue, setSelectedValue] = useState<string>(
    placeholder.toLowerCase()
  );
  const [data, setData] = useState<GenericData[]>([]);
  const [columns, setColumns] = useState<ColumnDef<GenericData>[]>(
    getColumns(placeholder.toLowerCase())
  );

  // Fetch data and update columns whenever the selected value changes
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/" + selectedValue, {
        headers: { cursor: 0 },
      })
      .then((response) => {
        setData(response.data);
        setColumns(getColumns(selectedValue));
      });
  }, [selectedValue]);

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

        <div className="flex pb-0">
          <Select onValueChange={(value) => setSelectedValue(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ingressos">Ingressos</SelectItem>
              <SelectItem value="sessoes">Sessões</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="container mx-auto py-2">
          <DataTable columns={columns} data={data} />
        </div>

        <div className="container mx-auto py-2">
          {selectedValue === "ingressos" && <AddIngresso />}
          {selectedValue === "sessoes" && <AddSessao />}
        </div>
      </section>
    </>
  );
}