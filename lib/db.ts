import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export async function getVendas(cursor: any) {
  const response = await api.get("/vendas", { headers: { cursor } });
  const data = await response.data;
  return data;
}

export async function getFilmes(cursor: any) {
  const response = await api.get("/filmes", { headers: { cursor } });
  const data = await response.data;
  return data;
}

export async function getSessoes(cursor: any) {
  const response = await api.get("/sessoes", { headers: { cursor } });
  const data = await response.data;
  return data;
}

export async function getIngressos(cursor: any) {
  const response = await api.get("/ingressos", { headers: { cursor } });
  const data = await response.data;
  return data;
}

export async function getSalas(cursor: any) {
  const response = await api.get("/salas", { headers: { cursor } });
  const data = await response.data;
  return data;
}

export async function getAssentos(cursor: any) {
  const response = await api.get("/assentos", { headers: { cursor } });
  const data = await response.data;
  return data;
}

export async function getProdutos(cursor: any) {
  const response = await api.get("/produtos", { headers: { cursor } });
  const data = await response.data;
  return data;
}
