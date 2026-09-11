export type FormaPagamento = 'pix' | 'cartao' | 'transferencia' | 'dinheiro';

export interface Recibo {
  id: string;
  codigo: string;
  clienteId: string | null;
  orcamentoId: string | null;
  propostaCodigo: string;
  clienteNome: string;
  clienteDocumento: string;
  clienteTelefone: string;
  servicoDescricao: string;
  valor: number;
  valorExtenso: string;
  formaPagamento: FormaPagamento;
  formaPagamentoLabel: string;
  comNotaFiscal: boolean;
  /** ISO — formatar com `formatDataHora` na exibição. */
  dataPagamento: string;
  autenticacao: string;
  createdAt: string;
}

export interface ReciboInput {
  clienteId?: string | null;
  orcamentoId?: string | null;
  clienteNome: string;
  clienteDocumento?: string;
  clienteTelefone?: string;
  servicoDescricao: string;
  valor: number;
  formaPagamento: FormaPagamento;
  comNotaFiscal?: boolean;
}

export const FORMAS_PAGAMENTO: Array<{ value: FormaPagamento; label: string }> = [
  { value: 'pix', label: 'Pix (Chave CNPJ / Telefone)' },
  { value: 'cartao', label: 'Cartão de Débito / Crédito' },
  { value: 'transferencia', label: 'Transferência Bancária (TED)' },
  { value: 'dinheiro', label: 'Dinheiro em Espécie' },
];
