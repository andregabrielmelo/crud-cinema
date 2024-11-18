import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useTableData } from "@/lib/useTableData";
import { Assento } from "@/lib/definitions";

const assentoSchema = z.object({
  id_sala: z.coerce.number(),
  codigo: z.string(),
  vip: z.coerce.boolean(),
});

type AssentoSchema = z.infer<typeof assentoSchema>;

export default function AddCinema() {
  const { register, handleSubmit } = useForm<AssentoSchema>({
    resolver: zodResolver(assentoSchema),
  });

  const { addItem } = useTableData();

  function addAssento(data: AssentoSchema) {
    const resAxios = axios.post("/api/assentos", data).then((res) => {
      const newData: Assento = {
        id: res.data,
        ...data,
      };
      addItem(newData);
    });
    toast.promise(resAxios, {
      error: (e) => e?.response?.data ?? "Erro ao incluir o assento",
      loading: "Incluindo assento",
      success: "Assento incluido com sucesso",
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(addAssento)}
        className="flex items-center gap-2"
      >
        <Input {...register("id_sala")} placeholder="Sala" />
        <Input {...register("codigo")} placeholder="Código" />
        <Input {...register("vip")} placeholder="vip" />
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
