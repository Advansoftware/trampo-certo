import { Injectable } from '@nestjs/common';
import { DbService } from '../database/db.service';

export interface MeiMetrics {
  faturamentoAcumulado: number;
  limiteAnual: number;
  percentualUtilizado: number;
  faturamentoMes: number;
  aReceber: number;
  dasMeiValor: number;
  dasMeiVencimento: string;
  dasMeiStatus: string;
  dasMei: {
    competencia: string;
    valor: number;
    vencimento: string;
    status: string;
    chavePix?: string;
  };
}

@Injectable()
export class MeiService {
  constructor(private readonly db: DbService) {}

  async getMetrics(): Promise<MeiMetrics> {
    try {
      const rows = await this.db.query<any>(
        'SELECT * FROM mei_metrics ORDER BY updatedAt DESC LIMIT 1',
      );

      if (rows && rows.length > 0) {
        const row = rows[0];
        const faturamentoAcumulado = Number(row.faturamentoAcumulado) || 42350.0;
        const limiteAnual = Number(row.limiteAnual) || 81000.0;
        const percentualUtilizado = Math.round((faturamentoAcumulado / limiteAnual) * 100);
        const valor = Number(row.dasMeiValor) || 75.6;
        let vencimento = '20/09/2026';
        if (row.dasMeiVencimento) {
          const d = new Date(row.dasMeiVencimento);
          if (!isNaN(d.getTime())) {
            const dia = String(d.getUTCDate()).padStart(2, '0');
            const mes = String(d.getUTCMonth() + 1).padStart(2, '0');
            const ano = d.getUTCFullYear();
            vencimento = `${dia}/${mes}/${ano}`;
          }
        }
        const status = row.dasMeiStatus || 'pendente';

        return {
          faturamentoAcumulado,
          limiteAnual,
          percentualUtilizado,
          faturamentoMes: Number(row.faturamentoMes) || 6420.0,
          aReceber: Number(row.aReceber) || 1850.0,
          dasMeiValor: valor,
          dasMeiVencimento: vencimento,
          dasMeiStatus: status,
          dasMei: {
            competencia: 'Setembro/2026',
            valor,
            vencimento,
            status,
            chavePix: '00020126580014br.gov.bcb.pix0136451237890001905204000053039865802BR5913RODRIGO SILVA6009SAO PAULO62070503***6304E2A1',
          },
        };
      }
    } catch {
      // Fallback seguro caso o banco ainda esteja inicializando
    }

    // Default mock data aligned with Stitch Design
    return {
      faturamentoAcumulado: 42350.0,
      limiteAnual: 81000.0,
      percentualUtilizado: 52,
      faturamentoMes: 6420.0,
      aReceber: 1850.0,
      dasMeiValor: 75.6,
      dasMeiVencimento: '20/09/2026',
      dasMeiStatus: 'pendente',
      dasMei: {
        competencia: 'Setembro/2026',
        valor: 75.6,
        vencimento: '20/09/2026',
        status: 'pendente',
        chavePix: '00020126580014br.gov.bcb.pix0136451237890001905204000053039865802BR5913RODRIGO SILVA6009SAO PAULO62070503***6304E2A1',
      },
    };
  }
}
