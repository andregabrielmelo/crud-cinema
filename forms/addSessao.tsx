import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const sessaoSchema = z.object({
  id_sala: z.coerce.number(),
  nome_do_filme: z.string(),
  horario_inicial: z.string(),
  horario_final: z.string(),
});

type SessaoSchema = z.infer<typeof sessaoSchema>;

export default function AddCinema() {
  const { register, handleSubmit } = useForm<SessaoSchema>({
    resolver: zodResolver(sessaoSchema),
  });

  function addAssento(data: SessaoSchema) {
    console.log(data);
    axios.post("http://localhost:3000/api/sessoes", data).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(addAssento)}
        className="flex items-center gap-2"
      >
        <Input {...register("id_sala")} placeholder="Sala ID" />
        <Input {...register("nome_do_filme")} placeholder="Nome do Filme" />
        <Input {...register("horario_inicial")} placeholder="Horario Inicial" />
        <Input {...register("horario_final")} placeholder="Horário FInal" />
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
