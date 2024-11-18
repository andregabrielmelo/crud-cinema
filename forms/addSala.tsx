import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useTableData } from "@/lib/useTableData";
import { Sala } from "@/lib/definitions";
import toast from "react-hot-toast";

const salaSchema = z.object({
  bloco: z.string(),
  numero: z.coerce.number(),
});

type SalaSchema = z.infer<typeof salaSchema>;

export default function AddCinema() {
  const { register, handleSubmit } = useForm<SalaSchema>({
    resolver: zodResolver(salaSchema),
  });

  const { addItem } = useTableData();

  function addAssento(data: SalaSchema) {
    const resAxios = axios.post("/api/salas", data).then((response) => {
      const newData: Sala = {
        id: response.data,
        total_de_assentos: 0,
        ...data,
      };
      addItem(newData);
    });
    toast.promise(resAxios, {
      error: "Erro ao incluir a sala",
      loading: "Incluindo sala",
      success: "Sala incluida com sucesso",
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
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
