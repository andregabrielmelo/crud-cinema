import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const salaSchema = z.object({
  bloco: z.string(),
  numero: z.coerce.number(),
  total_de_assentos: z.coerce.number(),
});

type SalaSchema = z.infer<typeof salaSchema>;

export default function AddCinema() {
  const { register, handleSubmit } = useForm<SalaSchema>({
    resolver: zodResolver(salaSchema),
  });

  function addAssento(data: SalaSchema) {
    console.log(data);
    axios.post("http://localhost:3000/api/salas", data).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(addAssento)}
        className="flex items-center gap-2"
      >
        <Input {...register("bloco")} placeholder="Bloco" />
        <Input {...register("numero")} placeholder="Número" />
        <Input
          {...register("total_de_assentos")}
          placeholder="Total de Assentos"
        />
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
