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

type dropMenuOptions = {
  edit: boolean;
  delete: boolean;
};

const DataTableRowActions = (
  props: any,
  tableName: TableName,
  menuOption: dropMenuOptions = {
    delete: true,
    edit: true,
  }
) => {
  const { deleteItem: deleteTableitem } = useTableData();
  const { editModal } = useTableData();

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
    editModal.setData({
      data: props.row.original,
      tableName: tableName,
    });
    editModal.setOpen(true);
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
        {menuOption.edit && (
          <DropdownMenuItem onClick={editItem}>Editar</DropdownMenuItem>
        )}
        {menuOption.delete && (
          <DropdownMenuItem onClick={deleteItem}>Deletar</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;
