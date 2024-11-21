"use client";

import { DataTable } from "@/components/DataTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import getColumns, { getColumnsView } from "@/lib/columns";
import { Assento, Sessao } from "@/lib/definitions";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ComprarIngresso() {
  const [data, setData] = useState<Sessao[] | Assento[]>([]);
  const [step, setStep] = useState(0);
  const [columns, setColums] = useState(getColumnsView("sessoes"));
  const selectedSession = useRef(0);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/sessoes", {
        headers: {
          cursor: 0,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  function onClick(row: Sessao | Assento) {
    console.log(row);
    if (!step) {
      axios
        .get("/api/assentos", {
          headers: {
            cursor: 0,
            sessao: row.id,
          },
        })
        .then((res) => {
          selectedSession.current = row.id as number;
          setColums(getColumnsView("assentos"));
          setStep(1);
          setData(res.data);
        });
    } else {
      const resAxios = axios
        .post("/api/ingressos", {
          id_sessao: selectedSession.current,
          id_assento: row.id,
        })
        .then((res) => {
          router.push("/ingressos");
        });
      toast.promise(resAxios, {
        error: (e) => e?.response?.data ?? "Erro ao compraro ingresso",
        loading: "Comprando ingresso",
        success: "Ingresso adquirido com sucesso",
      });
    }
  }

  return (
    <>
      <section className="container mx-auto py-2">
        <h1 className="title pb-2">Comprar Ingresso</h1>

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
                <BreadcrumbPage>Filmes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="container mx-auto py-2">
          <DataTable
            //@ts-ignore
            columns={columns}
            data={data}
            onClick={onClick}
          />
        </div>
      </section>
    </>
  );
}
