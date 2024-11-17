"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { GenericData } from "@/lib/definitions";
import axios from "axios";

interface DataTableRowActionsProps<GenericData> {
  row: GenericData;
  tableName: string;
}

const onEdit = (row: GenericData) => {
  // Edit current row
  console.log("Editing row with ID:", row.id);
};

const onDelete = (row: GenericData, tableName: string) => {
  // Delete current row
  axios
    .delete("http://localhost:3000/api/" + tableName, {
      headers: {
        id: row.id,
      },
    })
    .then((response) => {
      console.log(response);
    });
};

const DataTableRowActions = ({
  row,
  tableName,
}: DataTableRowActionsProps<GenericData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEdit(row)}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(row, tableName)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;
