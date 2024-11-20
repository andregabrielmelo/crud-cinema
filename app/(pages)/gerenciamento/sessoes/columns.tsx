"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/DataTableRowActions";
import type { Sessao } from "@/lib/definitions";

export const columns: ColumnDef<Sessao>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "id_sala", header: "Sala ID" },
  { accessorKey: "nome_do_filme", header: "Filme" },
  { accessorKey: "horario_inicial", header: "Horário Inicial" },
  { accessorKey: "horario_final", header: "Horário Final" },
  {
    id: "actions",
    header: "Ações",
    cell: (props) => <DataTableRowActions {...props} tableName={"sessoes"} />,
  },
];
