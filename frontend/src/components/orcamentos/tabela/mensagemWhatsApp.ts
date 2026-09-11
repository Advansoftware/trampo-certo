import { Orcamento } from '@/types';
import { formatMoeda, formatNumero, linkWhatsApp } from '@/lib/format';

const BASE_PROPOSTA = 'https://trampocerto.com.br/proposta';

/** Mensagem curta enviada da listagem de orçamentos. */
export function mensagemOrcamento(orcamento: Orcamento): string {
  const linhas = [
    `Olá ${orcamento.clienteNome}! 👋 Segue seu orçamento da TrampoCerto (${orcamento.codigo}):`,
    '',
    `🛠️ *Serviço:* ${orcamento.servicoDescricao || 'Serviços especializados'}`,
    `💰 *Valor Total:* ${formatMoeda(orcamento.valorTotal)}`,
  ];

  if (orcamento.condicoesPagamento) linhas.push(`💳 *Condições:* ${orcamento.condicoesPagamento}`);
  linhas.push('', `🔗 Acesse a proposta completa: ${BASE_PROPOSTA}/${orcamento.id}`, '', 'Qualquer dúvida, fico à disposição!');

  return linhas.join('\n');
}

/** Mensagem detalhada, item a item, enviada do editor de proposta. */
export function mensagemPropostaDetalhada(params: {
  codigo: string;
  clienteNome: string;
  itens: Array<{ descricao: string; qtd: number; unidade?: string; unitario: number }>;
  subtotal: number;
  desconto: number;
  total: number;
  condicoesPagamento: string;
  validade: string;
  propostaId?: string;
}): string {
  const linhas = [
    `Olá ${params.clienteNome}! 👋 Segue a proposta comercial detalhada da TrampoCerto (${params.codigo}):`,
    '',
    '🛠️ *Serviços Orçados:*',
    ...params.itens.map(
      (item) =>
        `• ${item.descricao} (${item.qtd} ${item.unidade || 'un'} x ${formatMoeda(item.unitario)}) = ${formatMoeda(item.qtd * item.unitario)}`,
    ),
    '',
    `💰 *Subtotal:* R$ ${formatNumero(params.subtotal)}`,
  ];

  if (params.desconto > 0) linhas.push(`🏷️ *Desconto:* - ${formatMoeda(params.desconto)}`);

  linhas.push(
    `✅ *Total Geral:* ${formatMoeda(params.total)}`,
    `💳 *Condições:* ${params.condicoesPagamento}`,
    `📅 *Validade:* ${params.validade}`,
  );

  if (params.propostaId) {
    linhas.push('', `🔗 Acesse a proposta completa: ${BASE_PROPOSTA}/${params.propostaId}`);
  }
  linhas.push('', 'Fico à disposição para iniciarmos o trampo!');

  return linhas.join('\n');
}

export function abrirWhatsApp(telefone: string, mensagem: string): void {
  window.open(linkWhatsApp(telefone, mensagem), '_blank');
}
