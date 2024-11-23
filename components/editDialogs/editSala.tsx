import { Produto, Sala } from "@/lib/definitions";
import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useTableData } from "@/lib/useTableData";

export default function EditProduto() {
  const { editItem, editModal } = useTableData();
  const [data, setOpen] = [editModal.data?.data as Produto, editModal.setOpen];
  const onClose = () => setOpen(false);

  const confirmEdit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .put(
        "/api/produtos/",
        {
          nome: (e as any).target[0].value,
          preco: (e as any).target[1].value,
        },
        {
          headers: {
            id: data.id,
          },
        }
      )
      .then((res) => {
        editItem(res.data);
        onClose();
      })
      .catch((e) => console.error(e));
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Editar Produto</DialogTitle>
      </DialogHeader>
      <form onSubmit={confirmEdit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input defaultValue={data.nome} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Preço
            </Label>
            <Input defaultValue={data.preco} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar alterações</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
