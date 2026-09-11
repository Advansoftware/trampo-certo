export type StatusTermometro = 'SEGURO' | 'ATENCAO' | 'CRITICO';
export type StatusDas = 'pago' | 'pendente' | 'vencido' | 'a_vencer';

export interface DasCompetencia {
  competencia: string;
  competenciaLabel: string;
  valor: number;
  vencimento: string;
  status: StatusDas;
  pagoEm: string | null;
  chavePix: string;
}

export interface MeiMetrics {
  ano: number;
  faturamentoAcumulado: number;
  limiteAnual: number;
  percentualUtilizado: number;
  saldoRestante: number;
  faturamentoMes: number;
  aReceber: number;
  mediaMensal: number;
  projecaoAnual: number;
  statusTermometro: StatusTermometro;
  dasMei: DasCompetencia;
}

export interface ReceitaMensal {
  mes: string;
  competencia: string;
  servicosSemNf: number;
  servicosComNf: number;
  total: number;
  dasStatus: StatusDas;
  dasValor: number;
  dasPagoEm: string | null;
}

export interface DestaquesMensais {
  faturamentoMes: number;
  faturamentoMesAnterior: number;
  variacaoFaturamento: number | null;
  aReceber: number;
  aReceberQtd: number;
  ticketMedio: number;
  ticketMedioAnterior: number;
  variacaoTicket: number | null;
  recibosEmitidos: number;
  orcamentosFechados: number;
}

export interface MeiConfig {
  limiteAnual: number;
  dasValor: number;
  dasDiaVencimento: number;
  chavePix: string;
}
