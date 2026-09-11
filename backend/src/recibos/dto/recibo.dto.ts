import { toNumber } from '../../common/utils/number.util';
import { enumValue, optionalString, optionalText, requiredString } from '../../common/utils/validation.util';
import { FORMAS_PAGAMENTO, FormaPagamento } from '../recibo.entity';
import { BadRequestException } from '@nestjs/common';

export interface ReciboPayload {
  clienteId: string | null;
  orcamentoId: string | null;
  clienteNome: string;
  clienteDocumento: string | null;
  clienteTelefone: string | null;
  servicoDescricao: string;
  valor: number;
  formaPagamento: FormaPagamento;
  comNotaFiscal: boolean;
  dataPagamento: string | null;
}

export function parseCreateRecibo(body: Record<string, unknown>): ReciboPayload {
  const valor = toNumber(body.valor);
  if (valor <= 0) throw new BadRequestException('Informe um valor maior que zero para o recibo.');

  return {
    clienteId: optionalString(body.clienteId, 36),
    orcamentoId: optionalString(body.orcamentoId, 36),
    clienteNome: requiredString(body.clienteNome, 'clienteNome'),
    clienteDocumento: optionalString(body.clienteDocumento, 30),
    clienteTelefone: optionalString(body.clienteTelefone, 30),
    servicoDescricao: requiredString(body.servicoDescricao, 'servicoDescricao', 2000),
    valor,
    formaPagamento: enumValue(body.formaPagamento, FORMAS_PAGAMENTO, 'formaPagamento', 'pix'),
    comNotaFiscal: body.comNotaFiscal === true || body.comNotaFiscal === 'true',
    dataPagamento: optionalText(body.dataPagamento),
  };
}
