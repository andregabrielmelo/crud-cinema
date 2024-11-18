import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useTableData } from "@/lib/useTableData";
import { Produto } from "@/lib/definitions";

const produtoSchema = z.object({
  nome: z.string(),
  preco: z.coerce.number(),
});

type ProdutoSchema = z.infer<typeof produtoSchema>;

export default function AddCinema() {
  const { register, handleSubmit } = useForm<ProdutoSchema>({
    resolver: zodResolver(produtoSchema),
  });

  const { addItem } = useTableData();

  function addAssento(data: ProdutoSchema) {
    const resAxios = axios.post("/api/produtos", data).then((response) => {
      const newData: Produto = {
        id: response.data,
        ...data,
      };
      addItem(newData)
    });
    toast.promise(resAxios, {
      error: (e) => e?.response?.data ?? "Erro ao incluir o assento",
      loading: "Incluindo produto",
      success: "Produto incluido com sucesso",
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
