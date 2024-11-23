import type { GenericData, Sessao, TableName } from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";
import DataTableRowActions from "@/components/DataTableRowActions";
import { formatDate } from "./utils";

function getColumns(type: TableName): ColumnDef<GenericData>[] {
  switch (type) {
    case "salas":
      return [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "bloco", header: "Bloco" },
        { accessorKey: "numero", header: "Número" },
        { accessorKey: "total_de_assentos", header: "Total Assentos" },
        {
          id: "actions",
          header: "Ações",
          cell: (props) => DataTableRowActions(props, type),
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
          cell: (props) => DataTableRowActions(props, type),
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
          cell: (props) => DataTableRowActions(props, type),
        },
      ];
    case "sessoes":
      return [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "id_sala", header: "Sala ID" },
        { accessorKey: "nome_do_filme", header: "Filme" },
        {
          accessorKey: "horario_inicial",
          header: "Horário Inicial",
          accessorFn: (e) => formatDate((e as Sessao).horario_inicial),
        },
        {
          accessorKey: "horario_final",
          header: "Horário Final",
          accessorFn: (e) => formatDate((e as Sessao).horario_final),
        },
        {
          id: "actions",
          header: "Ações",
          cell: (props) => DataTableRowActions(props, type),
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
          cell: (props) =>
            DataTableRowActions(props, type, {
              delete: true,
              edit: false,
            }),
        },
      ];
    case "vendas":
      return [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "descricao", header: "Descrição" },
        { accessorKey: "preco", header: "Valor" },
        { accessorKey: "horario_venda", header: "Data e Hora" },
        {
          id: "actions",
          header: "Ações",
          cell: (props) =>
            DataTableRowActions(props, type, { edit: false, delete: false }),
        },
      ];
    default:
      return [];
  }
}

export function getColumnsView(type: TableName): ColumnDef<GenericData>[] {
  switch (type) {
    case "sessoes":
      return [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "id_sala", header: "Sala ID" },
        { accessorKey: "nome_do_filme", header: "Filme" },
        {
          accessorKey: "horario_inicial",
          header: "Horário Inicial",
          accessorFn: (e) => formatDate((e as Sessao).horario_inicial),
        },
        {
          accessorKey: "horario_final",
          header: "Horário Final",
          accessorFn: (e) => formatDate((e as Sessao).horario_final),
        },
      ];
    case "assentos":
      return [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "id_sala", header: "Sala ID" },
        { accessorKey: "codigo", header: "Código" },
        { accessorKey: "vip", header: "VIP" },
        { accessorKey: "avaible", header: "DISPONIVEL" },
      ];
    default:
      return [];
  }
}
export default getColumns;
