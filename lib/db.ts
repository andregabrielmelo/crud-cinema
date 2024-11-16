import { GenericData } from "./definitions";
import axios from "axios";

export async function getData(
  type: string,
  id?: string
): Promise<GenericData[]> {
  // Fetch data from your API here.

  // Generate fake data based on types
  let data: GenericData[] = [];
  if (type === "vendas") {
    data = [
      {
        id: "1",
        description: "Venda 1",
        amount: 100,
        datetime: "2022-01-01T00:00:00",
      },
      {
        id: "2",
        description: "Venda 2",
        amount: 200,
        datetime: "2022-01-02T00:00:00",
      },
      {
        id: "3",
        description: "Venda 3",
        amount: 300,
        datetime: "2022-01-03T00:00:00",
      },
    ];
  } else if (type === "assentos") {
    data = [
      {
        id: "1",
        id_sala: "1",
        codigo: 1,
        vip: false,
      },
      {
        id: "2",
        id_sala: "1",
        codigo: 2,
        vip: false,
      },
      {
        id: "3",
        id_sala: "1",
        codigo: 3,
        vip: true,
      },
    ];
  } else if (type === "salas") {
    data = [
      {
        id: "1",
        bloco: "A",
        numero: 1,
        total_de_assentos: 100,
      },
      {
        id: "2",
        bloco: "A",
        numero: 2,
        total_de_assentos: 100,
      },
      {
        id: "3",
        bloco: "B",
        numero: 1,
        total_de_assentos: 200,
      },
    ];
  } else if (type === "produtos") {
    data = [
      {
        id: "1",
        nome: "Produto 1",
        preco: 10,
      },
      {
        id: "2",
        nome: "Produto 2",
        preco: 20,
      },
      {
        id: "3",
        nome: "Produto 3",
        preco: 30,
      },
    ];
  } else if (type === "ingressos") {
    data = [
      {
        id: "1",
        id_sessao: "1",
        id_assento: "1",
        preco: 10,
        horario_venda: "2022-01-01T00:00:00",
      },
      {
        id: "2",
        id_sessao: "1",
        id_assento: "2",
        preco: 20,
        horario_venda: "2022-01-01T00:00:00",
      },
      {
        id: "3",
        id_sessao: "1",
        id_assento: "3",
        preco: 30,
        horario_venda: "2022-01-01T00:00:00",
      },
    ];
  } else if (type === "sessoes") {
    data = [
      {
        id: "1",
        id_sala: "1",
        filme: "Filme 1",
        horario_inicial: "2022-01-01T00:00:00",
        horario_final: "2022-01-01T02:00:00",
      },
      {
        id: "2",
        id_sala: "1",
        filme: "Filme 2",
        horario_inicial: "2022-01-02T00:00:00",
        horario_final: "2022-01-02T02:00:00",
      },
      {
        id: "3",
        id_sala: "1",
        filme: "Filme 3",
        horario_inicial: "2022-01-03T00:00:00",
        horario_final: "2022-01-03T02:00:00",
      },
    ];
  }

  // If `id` is provided, filter the data by `id`. Otherwise, return all data.
  return id ? data.filter((d) => d.id === id) : data;
}

export async function get(url: string) {
  const response = await axios.get(url);
  return response.data;
}
