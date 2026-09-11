export type ClienteTipo = 'PF' | 'PJ';
export type ClienteStatus = 'ativo' | 'inativo';

/** Cliente como o front consome: dados cadastrais + agregados calculados no SQL. */
export interface Cliente {
  id: string;
  nome: string;
  tipo: ClienteTipo;
  documento: string;
  telefone: string;
  email: string;
  cidade: string;
  bairro: string;
  observacoes: string | null;
  status: ClienteStatus;
  tags: string[];
  totalFaturado: number;
  totalPropostas: number;
  propostasAprovadas: number;
  ultimoServico: string;
  createdAt: string;
}
