"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/DataTableRowActions";
import type { Produto } from "@/lib/definitions";

export const columns: ColumnDef<Produto>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "nome", header: "Nome" },
  { accessorKey: "preco", header: "Preço" },
  {
    id: "actions",
    header: "Ações",
    cell: (props) => <DataTableRowActions {...props} tableName={"produtos"} />,
  },
];
