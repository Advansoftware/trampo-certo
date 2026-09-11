import { BadRequestException } from '@nestjs/common';
import { round2, toNumber } from '../../common/utils/number.util';
import {
  enumValue,
  optionalString,
  optionalText,
  requiredString,
} from '../../common/utils/validation.util';
import { ItemOrcamento, ORCAMENTO_STATUS, OrcamentoStatus } from '../orcamento.entity';

export interface OrcamentoPayload {
  clienteId: string | null;
  clienteNome: string;
  clienteTelefone: string | null;
  clienteEmail: string | null;
  clienteDocumento: string | null;
  clienteLocalizacao: string | null;
  servicoDescricao: string | null;
  itens: ItemOrcamento[];
  desconto: number;
  valorTotal: number;
  condicoesPagamento: string | null;
  chavePix: string | null;
  validade: string | null;
  observacoes: string | null;
  status: OrcamentoStatus;
}

function parseItens(value: unknown): ItemOrcamento[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new BadRequestException('Inclua ao menos um item no orçamento.');
  }

  return value.map((raw, index) => {
    const item = (raw ?? {}) as Record<string, unknown>;
    const qtd = Math.max(0, toNumber(item.qtd, 1));
    const unitario = Math.max(0, toNumber(item.unitario));

    return {
      id: optionalString(item.id, 36) || String(index + 1),
      descricao: requiredString(item.descricao, `itens[${index}].descricao`, 500),
      subDescricao: optionalString(item.subDescricao, 500),
      unidade: optionalString(item.unidade, 20) || 'un',
      qtd,
      unitario,
      total: round2(qtd * unitario),
    };
  });
}

/** Total é sempre recalculado no servidor — o cliente não define preço final. */
function calcularTotal(itens: ItemOrcamento[], desconto: number): number {
  const subtotal = itens.reduce((acc, item) => acc + item.total, 0);
  return round2(Math.max(0, subtotal - desconto));
}

export function parseCreateOrcamento(body: Record<string, unknown>): OrcamentoPayload {
  const itens = parseItens(body.itens);
  const desconto = Math.max(0, toNumber(body.desconto));
  const servicoDescricao =
    optionalText(body.servicoDescricao) || itens.map((item) => item.descricao).join('; ');

  return {
    clienteId: optionalString(body.clienteId, 36),
    clienteNome: requiredString(body.clienteNome, 'clienteNome'),
    clienteTelefone: optionalString(body.clienteTelefone, 30),
    clienteEmail: optionalString(body.clienteEmail, 255),
    clienteDocumento: optionalString(body.clienteDocumento, 30),
    clienteLocalizacao: optionalString(body.clienteLocalizacao, 255),
    servicoDescricao,
    itens,
    desconto,
    valorTotal: calcularTotal(itens, desconto),
    condicoesPagamento: optionalString(body.condicoesPagamento, 255),
    chavePix: optionalString(body.chavePix, 255),
    validade: optionalString(body.validade, 120),
    observacoes: optionalText(body.observacoes),
    status: enumValue(body.status, ORCAMENTO_STATUS, 'status', 'pendente'),
  };
}

export function parseUpdateOrcamento(body: Record<string, unknown>): OrcamentoPayload {
  // A edição envia o formulário inteiro; validar tudo evita salvar meio orçamento.
  return parseCreateOrcamento(body);
}

export function parseStatus(body: Record<string, unknown>): OrcamentoStatus {
  return enumValue(body.status, ORCAMENTO_STATUS, 'status');
}
