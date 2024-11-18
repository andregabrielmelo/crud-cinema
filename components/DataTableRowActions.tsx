"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GenericData, TableName } from "@/lib/definitions";
import axios from "axios";
import toast from "react-hot-toast";
import { useTableData } from "@/lib/useTableData";
import { Dialog, DialogTrigger } from "./ui/dialog";
import EditModal from "./editDialogs/editModal";

const DataTableRowActions = (
  props: any,
  tableName: TableName,
  onEdit: (type: TableName, data: GenericData) => void
) => {
  const { deleteItem: deleteTableitem } = useTableData();
  const deleteItem = () => {
    const deletePromise = axios
      .delete(`/api/${tableName}`, {
        headers: {
          id: props.row.original.id,
        },
      })
      .then(() => {
        deleteTableitem(props.row.original.id);
      })
      .catch((e) => console.error(e));

    toast.promise(deletePromise, {
      error: "Erro ao excluir o registro",
      loading: "Excluindo",
      success: "Registro excluido com sucesso",
    });
  };

  const editItem = () => {
    onEdit(tableName, props.row.original);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={editItem}>Editar</DropdownMenuItem>
        <DropdownMenuItem onClick={deleteItem}>Deletar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;
