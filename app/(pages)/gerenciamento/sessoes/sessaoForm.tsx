"use client";

import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const vendaSchema = z.object({
  id_sala: z.coerce.number(),
  nome_do_filme: z.string(),
  horario_inicial: z.string(),
  horario_final: z.string(),
});

type VendaSchema = z.infer<typeof vendaSchema>;

export default function AddVenda() {
  const { register, handleSubmit } = useForm<VendaSchema>({
    resolver: zodResolver(vendaSchema),
  });

  function add(data: VendaSchema) {
    axios.post("http://localhost:3000/api/sessoes", data).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(add)} className="flex items-center gap-2">
        <Input {...register("id_sala")} placeholder="ID da Sala" />
        <Input {...register("nome_do_filme")} placeholder="Nome do Filme" />
        <Input
          {...register("horario_inicial")}
          placeholder="Horário de Inicial"
        />
        <Input {...register("horario_final")} placeholder="Horário de Final" />
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
