export type Sala = {
  id: string;
  bloco: string;
  numero: number;
  total_de_assentos: number;
};

export type Assento = {
  id: string;
  id_sala: string;
  codigo: number;
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
  filme: string;
  horario_inicial: string;
  horario_final: string;
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

export type GenericData = Venda | Assento | Sala | Produto | Ingresso | Sessao;
