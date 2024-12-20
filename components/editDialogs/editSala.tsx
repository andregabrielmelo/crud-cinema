import { Sala } from "@/lib/definitions";
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

export default function EditSala() {
  const { editItem, editModal } = useTableData();
  const [data, setOpen] = [editModal.data?.data as Sala, editModal.setOpen];
  const onClose = () => setOpen(false);

  const confirmEdit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .put(
        "/api/salas/",
        {
          bloco: (e as any).target[0].value.toString(),
          numero: parseInt((e as any).target[1].value),
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
        <DialogTitle>Editar sala</DialogTitle>
      </DialogHeader>
      <form onSubmit={confirmEdit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Bloco
            </Label>
            <Input defaultValue={data.bloco} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Numero
            </Label>
            <Input defaultValue={data.numero} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar alterações</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
