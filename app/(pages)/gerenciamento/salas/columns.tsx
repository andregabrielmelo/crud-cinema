"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/DataTableRowActions";
import type { Sala } from "@/lib/definitions";

export const columns: ColumnDef<Sala>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "bloco", header: "Bloco" },
  { accessorKey: "numero", header: "Número" },
  { accessorKey: "total_de_assentos", header: "Total Assentos" },
  {
    id: "actions",
    header: "Ações",
    cell: (props) => <DataTableRowActions {...props} tableName={"salas"} />,
  },
];
