export type Sala = {
  id: string;
  bloco: string;
  numero: number;
  total_de_assentos: number;
};

export type Assento = {
  id: number;
  id_sala: number;
  codigo: string;
  vip: boolean;
};

export type Produto = {
  id: string;
  nome: string;
  preco: number;
};

export type Sessao = {
  id: string;
  id_sala: string;
  nome_do_filme: string;
  horario_inicial: Date;
  horario_final: Date;
};

export type Ingresso = {
  id: string;
  id_sessao: string;
  id_assento: string;
  preco: number;
  horario_venda: string;
};

export type Venda = {
  id: string;
  description: string;
  amount: number;
  datetime: string;
};

export type TableName =
  | "vendas"
  | "assentos"
  | "salas"
  | "produtos"
  | "ingressos"
  | "sessoes";
export type GenericData = Venda | Assento | Sala | Produto | Ingresso | Sessao;
