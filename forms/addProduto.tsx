import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const produtoSchema = z.object({
  nome: z.string(),
  preco: z.coerce.number(),
});

type ProdutoSchema = z.infer<typeof produtoSchema>;

export default function AddCinema() {
  const { register, handleSubmit } = useForm<ProdutoSchema>({
    resolver: zodResolver(produtoSchema),
  });

  function addAssento(data: ProdutoSchema) {
    console.log(data);
    axios.post("http://localhost:3000/api/produtos", data).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(addAssento)}
        className="flex items-center gap-2"
      >
        <Input {...register("nome")} placeholder="Nome" />
        <Input {...register("preco")} placeholder="Preço" />
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
