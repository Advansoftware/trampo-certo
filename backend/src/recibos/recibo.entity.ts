export type FormaPagamento = 'pix' | 'cartao' | 'transferencia' | 'dinheiro';

export const FORMAS_PAGAMENTO: readonly FormaPagamento[] = ['pix', 'cartao', 'transferencia', 'dinheiro'];

/** Rótulo exibido no corpo do recibo — fonte única, o front não recalcula. */
export const FORMA_PAGAMENTO_LABEL: Record<FormaPagamento, string> = {
  pix: 'Pix (Chave CNPJ / Telefone)',
  cartao: 'Cartão de Débito / Crédito',
  transferencia: 'Transferência Bancária (TED)',
  dinheiro: 'Dinheiro em Espécie',
};

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
  dataPagamento: string;
  autenticacao: string;
  createdAt: string;
}
