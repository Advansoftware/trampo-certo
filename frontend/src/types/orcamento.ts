export type OrcamentoStatus = 'rascunho' | 'pendente' | 'aprovado' | 'recusado';

export interface ItemOrcamento {
  id: string;
  descricao: string;
  subDescricao: string | null;
  qtd: number;
  unidade: string;
  unitario: number;
  total: number;
}

export interface Orcamento {
  id: string;
  codigo: string;
  clienteId: string | null;
  clienteNome: string;
  clienteTelefone: string;
  clienteEmail: string;
  clienteDocumento: string;
  clienteLocalizacao: string;
  servicoDescricao: string;
  itens: ItemOrcamento[];
  subtotal: number;
  desconto: number;
  valorTotal: number;
  condicoesPagamento: string;
  chavePix: string;
  validade: string;
  observacoes: string;
  status: OrcamentoStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ItemOrcamentoInput {
  id?: string;
  descricao: string;
  subDescricao?: string | null;
  qtd: number;
  unidade?: string;
  unitario: number;
}

export interface OrcamentoInput {
  clienteId?: string | null;
  clienteNome: string;
  clienteTelefone?: string;
  clienteEmail?: string;
  clienteDocumento?: string;
  clienteLocalizacao?: string;
  servicoDescricao?: string;
  itens: ItemOrcamentoInput[];
  desconto?: number;
  condicoesPagamento?: string;
  chavePix?: string;
  validade?: string;
  observacoes?: string;
}

/** Status que congelam a proposta contra qualquer edição. */
export const STATUS_BLOQUEADOS: readonly OrcamentoStatus[] = ['aprovado', 'recusado'];

export function isOrcamentoBloqueado(status: string): boolean {
  return STATUS_BLOQUEADOS.includes(status as OrcamentoStatus);
}
