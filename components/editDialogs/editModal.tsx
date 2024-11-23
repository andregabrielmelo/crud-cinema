"use client";

import {
  Assento,
  GenericData,
  Produto,
  Sala,
  Sessao,
  TableName,
} from "@/lib/definitions";
import EditSala from "./editSala";
import { ReactElement } from "react";
import EditAssento from "./editAssento";
import EditProduto from "./editProduto";
import EditSessao from "./editSessao";
import { useTableData } from "@/lib/useTableData";
import { Dialog } from "../ui/dialog";

export default function EditModal() {
  const { editModal } = useTableData();
  const editModalTabs: {
    [key: string]: ReactElement;
  } = {
    salas: <EditSala />,
    assentos: <EditAssento />,
    produtos: <EditProduto />,
    sessoes: <EditSessao />,
  };

  return (
    <Dialog open={editModal.open} onOpenChange={() => editModal.setOpen(false)}>
      {editModal.data?.tableName && editModalTabs[editModal.data?.tableName]}
    </Dialog>
  );
}
