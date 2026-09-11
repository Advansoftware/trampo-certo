export type ClienteTipo = 'PF' | 'PJ';
export type ClienteStatus = 'ativo' | 'inativo';

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
  /** Agregados calculados no backend a partir de recibos e orçamentos. */
  totalFaturado: number;
  totalPropostas: number;
  propostasAprovadas: number;
  ultimoServico: string;
  createdAt: string;
}

export interface ClienteInput {
  nome: string;
  tipo?: ClienteTipo;
  documento?: string;
  telefone?: string;
  email?: string;
  cidade?: string;
  bairro?: string;
  observacoes?: string;
  status?: ClienteStatus;
  tags?: string[];
}
