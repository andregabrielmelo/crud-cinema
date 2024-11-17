import type { GenericData } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/DataTableRowActions";

function getColumns(type: string): ColumnDef<GenericData>[] {
  switch (type) {
    case "salas":
      return [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "bloco", header: "Bloco" },
        { accessorKey: "numero", header: "Número" },
        { accessorKey: "total_de_assentos", header: "Total de Assentos" },
        {
          id: "actions",
          header: "Ações",
          cell: ({ row }) => (
            <DataTableRowActions row={row.original} tableName={type} />
          ),
        },
      ];
    case "assentos":
      return [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "id_sala", header: "Sala ID" },
        { accessorKey: "codigo", header: "Código" },
        { accessorKey: "vip", header: "VIP" },
        {
          id: "actions",
          header: "Ações",
          cell: ({ row }) => (
            <DataTableRowActions row={row.original} tableName={type} />
          ),
        },
      ];
    case "produtos":
      return [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "nome", header: "Nome" },
        { accessorKey: "preco", header: "Preço" },
        {
          id: "actions",
          header: "Ações",
          cell: ({ row }) => (
            <DataTableRowActions row={row.original} tableName={type} />
          ),
        },
      ];
    case "sessoes":
      return [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "id_sala", header: "Sala ID" },
        { accessorKey: "nome_do_filme", header: "Filme" },
        { accessorKey: "horario_inicial", header: "Horário Inicial" },
        { accessorKey: "horario_final", header: "Horário Final" },
        {
          id: "actions",
          header: "Ações",
          cell: ({ row }) => (
            <DataTableRowActions row={row.original} tableName={type} />
          ),
        },
      ];
    case "ingressos":
      return [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "id_sessao", header: "Sessão ID" },
        { accessorKey: "id_assento", header: "Assento ID" },
        { accessorKey: "preco", header: "Preço" },
        { accessorKey: "horario_venda", header: "Horário Venda" },
        {
          id: "actions",
          header: "Ações",
          cell: ({ row }) => (
            <DataTableRowActions row={row.original} tableName={type} />
          ),
        },
      ];
    case "vendas":
      return [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "descricao", header: "Descrição" },
        { accessorKey: "preco", header: "Preço" },
        { accessorKey: "horario_venda", header: "Horário de Venda" },
        {
          id: "actions",
          header: "Ações",
          cell: ({ row }) => (
            <DataTableRowActions row={row.original} tableName={type} />
          ),
        },
      ];
    default:
      return [];
  }
}

export default getColumns;
