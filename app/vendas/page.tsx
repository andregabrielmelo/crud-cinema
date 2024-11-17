"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/DataTable";
import AddVenda from "@/forms/addVenda";
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

import type { GenericData } from "@/lib/definitions";

export default function Home() {
  const [data, setData] = useState<GenericData[]>([]);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/api/vendas", {
        headers: { cursor: 0 },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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

        <div className="container mx-auto py-2">
          <AddVenda />
        </div>
      </section>
    </>
  );
}
