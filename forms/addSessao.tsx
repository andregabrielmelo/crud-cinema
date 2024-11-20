import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { useState } from "react";
import { Sessao } from "@/lib/definitions";
import { useTableData } from "@/lib/useTableData";

const sessaoSchema = z.object({
  id_sala: z.coerce.number(),
  nome_do_filme: z.string(),
});

type SessaoSchema = z.infer<typeof sessaoSchema>;

export default function AddSessao() {
  const { addItem } = useTableData();
  const { register, handleSubmit } = useForm<SessaoSchema>({
    resolver: zodResolver(sessaoSchema),
  });
  const [horarioInicial, setHorarioInicial] = useState<Date>(new Date());
  const [horarioFinal, setHorarioFinal] = useState<Date>(new Date());
  function addSessao(data: any) {
    data.horario_inicial = horarioInicial.getTime();
    data.horario_final = horarioFinal.getTime();
    axios.post("/api/sessoes", data).then((response) => {
      const newItemData: Sessao = {
        id: response.data,
        horario_final: horarioFinal,
        horario_inicial: horarioInicial,
        id_sala: data.id_sala,
        nome_do_filme: data.nome_do_filme,
      };
      addItem(newItemData);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(addSessao)} className="flex gap-2 items-end">
        <Input {...register("id_sala")} placeholder="Sala ID" />
        <Input {...register("nome_do_filme")} placeholder="Nome do Filme" />
        <div>
          <Label htmlFor="name" className="text-right">
            Inicio
          </Label>
          <DateTimePicker date={horarioInicial} setDate={setHorarioInicial} />
        </div>
        <div>
          <Label htmlFor="name" className="text-right">
            Final
          </Label>
          <DateTimePicker date={horarioFinal} setDate={setHorarioFinal} />
        </div>
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
