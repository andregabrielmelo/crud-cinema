import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import type { Produto } from "@/lib/definitions";
import { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTable } from "react-table";
import { useTableData } from "@/lib/useTableData";

const vendaSchema = z.object({
  nome: z.string().nonempty("Selecione um produto"),
  preco: z.coerce.number().min(0, "O preço deve ser maior que zero"),
  quantidade: z.coerce.number().min(0, "A quantidade deve ser maior que zero"),
});

type VendaSchema = z.infer<typeof vendaSchema>;

export default function AddCinema() {
  const { register, handleSubmit, setValue, watch } = useForm<VendaSchema>({
    resolver: zodResolver(vendaSchema),
  });
  const { addItem } = useTableData();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/produtos");
        setProdutos(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  function handleProdutoSelect(produtoId: string) {
    const produto = produtos.find((p) => p.id === produtoId);
    if (produto) {
      setSelectedProduto(produto);
      setValue("nome", produto.nome); // Update "descricao" in the form
      setValue("preco", produto.preco); // Update "preco" in the form
    }
  }

  function addVenda(data: VendaSchema) {
    console.log("Submitting data:", data);
    axios.post("/api/vendas", data).then((response) => {
      addItem(response.data);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(addVenda)} className="flex gap-4 max-w-md">
        {/* Product Select */}
        <Select onValueChange={handleProdutoSelect}>
          <SelectTrigger>
            <SelectValue>
              {selectedProduto?.nome || "Selecione um Produto"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Produtos</SelectLabel>
              {produtos.map((produto) => (
                <SelectItem key={produto.id} value={produto.id}>
                  {produto.nome}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Price Input */}
        <Input
          {...register("preco")}
          disabled
          placeholder="Preço"
          value={selectedProduto?.preco || ""}
          readOnly
        />

        {/* Quantity Input */}
        <Input {...register("quantidade")} defaultValue={1} type="number" />

        {/* Submit Button */}
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
