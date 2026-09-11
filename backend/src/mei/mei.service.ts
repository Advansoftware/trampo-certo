import { BadRequestException, Injectable } from '@nestjs/common';
import {
  competenciaExtenso,
  competenciaOf,
  formatBrDate,
  nomeDoMes,
  vencimentoDas,
} from '../common/utils/date.util';
import { percent, round2 } from '../common/utils/number.util';
import {
  DasCompetencia,
  DestaquesMensais,
  MeiConfig,
  MeiMetrics,
  ReceitaMensal,
  StatusDas,
  StatusTermometro,
} from './mei.entity';
import { MeiRepository, TotalMensal } from './mei.repository';

const COMPETENCIA_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/;

@Injectable()
export class MeiService {
  constructor(private readonly repository: MeiRepository) {}

  getConfig(userId: string): Promise<MeiConfig> {
    return this.repository.getConfig(userId);
  }

  /**
   * Todos os números saem de recibos e orçamentos reais do usuário.
   * Do banco vêm apenas os parâmetros do MEI (teto, valor do DAS, vencimento).
   */
  async getMetrics(userId: string, ano = new Date().getFullYear()): Promise<MeiMetrics> {
    const [config, totais, aReceber] = await Promise.all([
      this.repository.getConfig(userId),
      this.repository.totaisPorMes(userId, ano),
      this.repository.aReceber(userId),
    ]);

    const hoje = new Date();
    const competenciaAtual = competenciaOf(hoje);
    const faturamentoAcumulado = round2(totais.reduce((acc, item) => acc + item.total, 0));
    const faturamentoMes = round2(totais.find((item) => item.competencia === competenciaAtual)?.total ?? 0);

    const mesesDecorridos = ano === hoje.getFullYear() ? hoje.getMonth() + 1 : 12;
    const mediaMensal = round2(faturamentoAcumulado / mesesDecorridos);
    const percentualUtilizado = percent(faturamentoAcumulado, config.limiteAnual);

    return {
      ano,
      faturamentoAcumulado,
      limiteAnual: config.limiteAnual,
      percentualUtilizado,
      saldoRestante: round2(Math.max(0, config.limiteAnual - faturamentoAcumulado)),
      faturamentoMes,
      aReceber: round2(aReceber.valor),
      mediaMensal,
      projecaoAnual: round2(mediaMensal * 12),
      statusTermometro: classificarTermometro(percentualUtilizado),
      dasMei: await this.dasDaCompetencia(userId, competenciaAtual, config, ano),
    };
  }

  async getReceitasMensais(userId: string, ano = new Date().getFullYear()): Promise<ReceitaMensal[]> {
    const [config, totais, pagamentos] = await Promise.all([
      this.repository.getConfig(userId),
      this.repository.totaisPorMes(userId, ano),
      this.repository.listarDas(userId, ano),
    ]);

    const competenciaAtual = competenciaOf(new Date());

    return Array.from({ length: 12 }, (_, indice) => {
      const competencia = `${ano}-${String(indice + 1).padStart(2, '0')}`;
      const total = totais.find((item) => item.competencia === competencia);
      const das = pagamentos.find((item) => item.competencia === competencia);

      return {
        mes: nomeDoMes(indice),
        competencia,
        servicosSemNf: round2(total?.semNf ?? 0),
        servicosComNf: round2(total?.comNf ?? 0),
        total: round2(total?.total ?? 0),
        dasStatus: das?.status ?? statusPadraoDas(competencia, competenciaAtual),
        dasValor: das ? round2(Number(das.valor)) : config.dasValor,
        dasPagoEm: formatBrDate(das?.pagoEm ?? null),
      };
    });
  }

  async getDestaques(userId: string): Promise<DestaquesMensais> {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const competenciaAtual = competenciaOf(hoje);
    const competenciaAnterior = competenciaOf(new Date(ano, hoje.getMonth() - 1, 1));

    const [totaisAno, totaisAnoAnterior, aReceber, orcamentosFechados] = await Promise.all([
      this.repository.totaisPorMes(userId, ano),
      competenciaAnterior.startsWith(String(ano))
        ? Promise.resolve<TotalMensal[]>([])
        : this.repository.totaisPorMes(userId, ano - 1),
      this.repository.aReceber(userId),
      this.repository.orcamentosAprovadosNoMes(userId, competenciaAtual),
    ]);

    const todos = [...totaisAno, ...totaisAnoAnterior];
    const atual = todos.find((item) => item.competencia === competenciaAtual);
    const anterior = todos.find((item) => item.competencia === competenciaAnterior);

    const ticketMedio = atual && atual.quantidade > 0 ? round2(atual.total / atual.quantidade) : 0;
    const ticketAnterior = anterior && anterior.quantidade > 0 ? round2(anterior.total / anterior.quantidade) : 0;

    return {
      faturamentoMes: round2(atual?.total ?? 0),
      faturamentoMesAnterior: round2(anterior?.total ?? 0),
      variacaoFaturamento: variacao(atual?.total ?? 0, anterior?.total ?? 0),
      aReceber: round2(aReceber.valor),
      aReceberQtd: aReceber.quantidade,
      ticketMedio,
      ticketMedioAnterior: ticketAnterior,
      variacaoTicket: variacao(ticketMedio, ticketAnterior),
      recibosEmitidos: atual?.quantidade ?? 0,
      orcamentosFechados,
    };
  }

  async pagarDas(userId: string, competencia: string): Promise<DasCompetencia> {
    if (!COMPETENCIA_REGEX.test(competencia)) {
      throw new BadRequestException('Competência inválida. Use o formato AAAA-MM.');
    }

    const config = await this.repository.getConfig(userId);
    await this.repository.registrarPagamentoDas(userId, competencia, config.dasValor);

    const ano = Number(competencia.slice(0, 4));
    return this.dasDaCompetencia(userId, competencia, config, ano);
  }

  private async dasDaCompetencia(
    userId: string,
    competencia: string,
    config: MeiConfig,
    ano: number,
  ): Promise<DasCompetencia> {
    const pagamentos = await this.repository.listarDas(userId, ano);
    const registro = pagamentos.find((item) => item.competencia === competencia);
    const competenciaAtual = competenciaOf(new Date());

    return {
      competencia,
      competenciaLabel: competenciaExtenso(competencia),
      valor: registro ? round2(Number(registro.valor)) : config.dasValor,
      vencimento: vencimentoDas(competencia, config.dasDiaVencimento),
      status: registro?.status ?? statusPadraoDas(competencia, competenciaAtual),
      pagoEm: formatBrDate(registro?.pagoEm ?? null),
      chavePix: config.chavePix,
    };
  }
}

function classificarTermometro(percentual: number): StatusTermometro {
  if (percentual >= 90) return 'CRITICO';
  if (percentual >= 70) return 'ATENCAO';
  return 'SEGURO';
}

/** Sem registro de pagamento: futuro é "a vencer", passado/atual é "pendente". */
function statusPadraoDas(competencia: string, competenciaAtual: string): StatusDas {
  return competencia > competenciaAtual ? 'a_vencer' : 'pendente';
}

function variacao(atual: number, anterior: number): number | null {
  if (!anterior) return null;
  return round2(((atual - anterior) / anterior) * 100);
}
