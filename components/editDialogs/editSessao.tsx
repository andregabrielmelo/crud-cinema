import { Assento, Sala, Sessao } from "@/lib/definitions";
import { FormEvent, useEffect, useState } from "react";
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
import { editModalData, useTableData } from "@/lib/useTableData";
import { TimePickerDemo } from "../ui/time-picker-demo";
import { DateTimePicker } from "../ui/date-time-picker";
import { sessoes } from "@prisma/client";

export default function EditSessao() {
  const { editItem, editModal } = useTableData();
  const [data, setOpen, setData, open] = [
    editModal.data?.data as Sessao,
    editModal.setOpen,
    editModal.setData,
    editModal.open
  ];
  useEffect(() => {
    setData((prev) => {
      const data = prev?.data as Sessao;
      data.horario_inicial = new Date(data.horario_inicial);
      data.horario_final = new Date(data.horario_final);
      return structuredClone(prev);
    });
  }, [open]);

  const onClose = () => setOpen(false);

  const confirmEdit = (e: FormEvent) => {
    e.preventDefault();
    if (!editModal.data?.data) {
      return;
    }
    const formData = editModal.data?.data as Sessao;
    axios
      .put(
        "/api/sessoes/",
        {
          horario_final: formData.horario_final.getTime(),
          horario_inicial: formData.horario_inicial.getTime(),
          id_sala : formData.id_sala,
          nome_do_filme : formData.nome_do_filme
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
            <DateTimePicker
              date={data.horario_inicial}
              setDate={(newDate) =>
                setData((prev) => {
                  if (prev?.data) {
                    const data: Sessao = prev.data as Sessao;
                    data.horario_inicial = newDate;
                  }
                  return structuredClone(prev);
                })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Fim
            </Label>
            <DateTimePicker
              date={data.horario_final}
              setDate={(newDate) =>
                setData((prev) => {
                  if (prev?.data) {
                    const data: Sessao = prev.data as Sessao;
                    data.horario_final = newDate;
                  }
                  return structuredClone(prev);
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar alterações</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
