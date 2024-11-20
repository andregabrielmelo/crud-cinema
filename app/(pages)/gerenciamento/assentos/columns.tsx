"use client";

import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/DataTableRowActions";
import type { Assento } from "@/lib/definitions";

export const columns: ColumnDef<Assento>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "id_sala", header: "Sala ID" },
  { accessorKey: "codigo", header: "Código" },
  { accessorKey: "vip", header: "VIP" },
  {
    id: "actions",
    header: "Ações",
    cell: (props) => <DataTableRowActions {...props} tableName={"assentos"} />,
  },
];
