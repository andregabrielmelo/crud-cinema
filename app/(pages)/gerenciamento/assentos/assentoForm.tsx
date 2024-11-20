"use client";

import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const assentoSchema = z.object({
  id_sala: z.coerce.number(),
  codigo: z.string(),
  vip: z.coerce.boolean(),
});

type AssentoSchema = z.infer<typeof assentoSchema>;

export default function AddAssento() {
  const { register, handleSubmit } = useForm<AssentoSchema>({
    resolver: zodResolver(assentoSchema),
  });

  function add(data: AssentoSchema) {
    axios.post("http://localhost:3000/api/assentos", data).then((response) => {
      console.log(response);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(add)} className="flex items-center gap-2">
        <Input {...register("id_sala")} placeholder="Sala ID" />
        <Input {...register("codigo")} placeholder="Código" />
        <Input {...register("vip")} placeholder="VIP" />
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
