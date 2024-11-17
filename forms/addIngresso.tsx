import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const ingressoSchema = z.object({
  id_sessao: z.coerce.number(),
  id_assento: z.coerce.number(),
  preco: z.coerce.number(),
});

type IngressoSchema = z.infer<typeof ingressoSchema>;

export default function AddCinema() {
  const { register, handleSubmit } = useForm<IngressoSchema>({
    resolver: zodResolver(ingressoSchema),
  });

  function addAssento(data: IngressoSchema) {
    console.log(data);
    axios.post("http://localhost:3000/api/ingressos", data).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(addAssento)}
        className="flex items-center gap-2"
      >
        <Input {...register("id_sessao")} placeholder="Sessão ID" />
        <Input {...register("id_assento")} placeholder="Assento ID" />
        <Input {...register("preco")} placeholder="Preço" />
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
