import { Assento, Sala, Sessao } from "@/lib/definitions";
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
import { Checkbox } from "../ui/checkbox";

export default function EditSessao() {
  const { editItem, editModal } = useTableData();
  const [data, setOpen] = [editModal.data?.data as Sessao, editModal.setOpen];
  const onClose = () => setOpen(false);
  const confirmEdit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .put(
        "/api/assentos/",
        {
          codigo: (e as any).target[0].value,
          vip: (e as any).target[1].getAttribute(["aria-checked"]) == "true",
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
  console.log(data);
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Editar Sessao</DialogTitle>
      </DialogHeader>
      <form onSubmit={confirmEdit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              ID da sala
            </Label>
            <Input defaultValue={data.id_sala} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Filme
            </Label>
            <Input defaultValue={data.nome_do_filme} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Inicio
            </Label>
            <Input defaultValue={data.horario_inicial} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Fim
            </Label>
            <Input defaultValue={data.horario_final} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar alterações</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
