"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableName } from "@/lib/definitions";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useTableData } from "@/lib/useTableData";

type dropMenuOptions = {
  edit: boolean;
  delete: boolean;
};

type DataTableRowActionsProps = {
  row: any; // Replace `any` with the proper type for your row data
  tableName: TableName;
  menuOption?: dropMenuOptions;
};

const DataTableRowActions: React.FC<DataTableRowActionsProps> = ({
  row,
  tableName,
  menuOption = { delete: true, edit: true },
}) => {
  const { deleteItem: deleteTableitem } = useTableData();
  const { editModal } = useTableData();

  const deleteItem = () => {
    console.log("Tabela: ", tableName);
    console.log(row.original.id);
    const deletePromise = axios
      .delete(`/api/${tableName}`, {
        headers: {
          id: row.original.id,
        },
      })
      .then(() => {
        deleteTableitem(row.original.id);
      })
      .catch((error) => {
        console.error("Delete Error:", error.response?.data || error.message);
        console.log("Error: ", error);
      });

    toast.promise(deletePromise, {
      error: "Erro ao excluir o registro",
      loading: "Excluindo",
      success: "Registro excluido com sucesso",
    });
  };

  const editItem = () => {
    editModal.setData({
      data: row.original,
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
