"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/DataTableRowActions";
import type { Venda } from "@/lib/definitions";

export const columns: ColumnDef<Venda>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "descricao", header: "Descrição" },
  { accessorKey: "preco", header: "Preço" },
  { accessorKey: "horario_venda", header: "Horário de Venda" },
  {
    id: "actions",
    header: "Ações",
    cell: (props) => <DataTableRowActions {...props} tableName={"vendas"} />,
  },
];
