import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const vendaSchema = z.object({
  descricao: z.string(),
  preco: z.coerce.number(),
});

type VendaSchema = z.infer<typeof vendaSchema>;

export default function AddCinema() {
  const { register, handleSubmit } = useForm<VendaSchema>({
    resolver: zodResolver(vendaSchema),
  });

  function addAssento(data: VendaSchema) {
    console.log(data);
    axios.post("http://localhost:3000/api/vendas", data).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(addAssento)}
        className="flex items-center gap-2"
      >
        <Input {...register("descricao")} placeholder="Descrição" />
        <Input {...register("preco")} placeholder="Preço" />
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}