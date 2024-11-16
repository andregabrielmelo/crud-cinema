"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/DataTable";
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
import type { GenericData, Sala } from "@/lib/definitions";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState<string>("assentos");
  const [data, setData] = useState<GenericData[]>([]);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [columns, setColumns] = useState<ColumnDef<GenericData>[]>(
    getColumns("assentos")
  );

  // Pega todas as salas uma vez
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/salas", {
        headers: { cursor: 0 },
      })
      .then((response) => {
        setSalas(response.data);
      });
  }, []);

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
        <h1 className="heading pb-2">
          Bem vindo ao
          <span className="font-black text-sky-400 text-5xl pl-2">
            GoodCinema!
          </span>
        </h1>
        <p>
          Aqui você pode gerenciar os filmes, salas e sessões do seu cinema.
          <br />
          Além disso, você pode visualizar os produtos e os ingressos vendidos.
          <br />É um CRUD básico para gerenciamento do cinema.
        </p>
      </section>
      <section className="container mx-auto py-2">
        <h1 className="title pb-2">Salas</h1>

        <div className="flex pb-0">
          <Select onValueChange={(value) => setSelectedValue(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {salas.map((element) => (
                <SelectItem
                  key={element.id}
                  value={element.bloco + element.numero}
                >
                  {element.bloco + element.numero}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="container mx-auto py-2">
          <DataTable columns={columns} data={data} />
        </div>
      </section>
    </>
  );
}
