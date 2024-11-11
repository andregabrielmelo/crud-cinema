import { getData } from "@/lib/db";
import type { Venda } from "@/lib/definitions";

export default async function Venda({ params }: { params: { id: string } }) {
  const venda: Venda[] = await getData(params.id);

  return (
    <div className="container mx-auto py-2">
      <h1 className="heading">Venda</h1>
      <p>{venda[0].description}</p>
      <p>Amount: {venda[0].amount}</p>
      <p>Date: {venda[0].datetime}</p>
    </div>
  );
}
