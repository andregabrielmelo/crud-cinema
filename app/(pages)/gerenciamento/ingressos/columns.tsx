"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/DataTableRowActions";
import type { Ingresso } from "@/lib/definitions";

export const columns: ColumnDef<Ingresso>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "id_sessao", header: "Sessão ID" },
  { accessorKey: "id_assento", header: "Assento ID" },
  { accessorKey: "preco", header: "Preço" },
  { accessorKey: "horario_venda", header: "Horário Venda" },
  {
    id: "actions",
    header: "Ações",
    cell: (props) => <DataTableRowActions {...props} tableName={"ingressos"} />,
  },
];
