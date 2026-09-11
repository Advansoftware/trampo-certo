export type OrcamentoStatus = 'rascunho' | 'pendente' | 'aprovado' | 'recusado';

export const ORCAMENTO_STATUS: readonly OrcamentoStatus[] = ['rascunho', 'pendente', 'aprovado', 'recusado'];

/** Status que congelam a proposta: nada mais pode ser editado. */
export const STATUS_BLOQUEADOS: readonly OrcamentoStatus[] = ['aprovado', 'recusado'];

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
