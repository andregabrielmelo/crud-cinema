"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/DataTable";
import AddAssento from "@/forms/addAssento";
import AddSala from "@/forms/addSala";
import AddProduto from "@/forms/addProduto";
import getColumns from "@/lib/columns";
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
import type { GenericData, TableName } from "@/lib/definitions";
import toast from "react-hot-toast";
import { useTableData } from "@/lib/useTableData";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState<TableName>("assentos");
  const { data, setData } = useTableData();
  const [columns, setColumns] = useState<ColumnDef<GenericData>[]>(
    getColumns("assentos")
  );

  // Fetch data and update columns whenever the selected value changes
  React.useEffect(() => {
    axios
      .get("/api/" + selectedValue, {
        headers: { cursor: 0 },
      })
      .then((response) => {
        setData(response.data);
        setColumns(getColumns(selectedValue));
      });
      setData(fetchedData.data);
      setColumns(getColumns(selectedValue));
    }
    fetchData();
  }, [selectedValue]);

  return (
    <>
      <section className="container mx-auto py-2">
        <h1 className="title pb-2">Cinema</h1>

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
                <BreadcrumbPage>Cinema</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex pb-0">
          <Select onValueChange={(value: TableName) => setSelectedValue(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={"Assentos"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="assentos">Assentos</SelectItem>
              <SelectItem value="salas">Salas</SelectItem>
              <SelectItem value="produtos">Produtos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="container mx-auto py-2">
          <DataTable columns={columns} data={data} />
        </div>

        <div className="container mx-auto py-2">
          {selectedValue === "assentos" && <AddAssento />}
          {selectedValue === "salas" && <AddSala />}
          {selectedValue === "produtos" && <AddProduto />}
        </div>
      </section>
    </>
  );
}
