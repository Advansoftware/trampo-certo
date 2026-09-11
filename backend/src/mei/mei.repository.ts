import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DatabaseService, SqlParam } from '../database/database.service';
import { toNumber } from '../common/utils/number.util';
import { MeiConfig, StatusDas } from './mei.entity';

export interface TotalMensal {
  competencia: string;
  comNf: number;
  semNf: number;
  total: number;
  quantidade: number;
}

export interface DasRow {
  competencia: string;
  valor: number;
  status: StatusDas;
  pagoEm: Date | null;
}

@Injectable()
export class MeiRepository {
  constructor(private readonly db: DatabaseService) {}

  /** Config do MEI; criada com os padrões legais na primeira leitura. */
  async getConfig(userId: string): Promise<MeiConfig> {
    await this.db.mutate('INSERT IGNORE INTO mei_config (userId) VALUES (?)', [userId]);

    const row = await this.db.queryOne<{
      limiteAnual: number;
      dasValor: number;
      dasDiaVencimento: number;
      chavePix: string | null;
    }>(
      `SELECT c.limiteAnual, c.dasValor, c.dasDiaVencimento,
              COALESCE(c.chavePix, u.chavePix) AS chavePix
         FROM mei_config c
         JOIN user u ON u.id = c.userId
        WHERE c.userId = ?`,
      [userId],
    );

    return {
      limiteAnual: toNumber(row?.limiteAnual, 81000),
      dasValor: toNumber(row?.dasValor, 75.6),
      dasDiaVencimento: Number(row?.dasDiaVencimento || 20),
      chavePix: row?.chavePix || '',
    };
  }

  async updateConfig(userId: string, updates: Partial<MeiConfig>): Promise<void> {
    const columns: string[] = [];
    const values: SqlParam[] = [];
    for (const [key, value] of Object.entries(updates)) {
      columns.push(`${key} = ?`);
      values.push(value as SqlParam);
    }
    if (columns.length === 0) return;

    await this.db.mutate('INSERT IGNORE INTO mei_config (userId) VALUES (?)', [userId]);
    await this.db.mutate(`UPDATE mei_config SET ${columns.join(', ')} WHERE userId = ?`, [...values, userId]);
  }

  /** Receita realizada (recibos emitidos) agrupada por competência. */
  async totaisPorMes(userId: string, ano: number): Promise<TotalMensal[]> {
    const rows = await this.db.query<{
      competencia: string;
      comNf: number;
      semNf: number;
      total: number;
      quantidade: number;
    }>(
      `SELECT DATE_FORMAT(dataPagamento, '%Y-%m') AS competencia,
              COALESCE(SUM(CASE WHEN comNotaFiscal = 1 THEN valor ELSE 0 END), 0) AS comNf,
              COALESCE(SUM(CASE WHEN comNotaFiscal = 1 THEN 0 ELSE valor END), 0) AS semNf,
              COALESCE(SUM(valor), 0) AS total,
              COUNT(*) AS quantidade
         FROM recibos
        WHERE userId = ? AND YEAR(dataPagamento) = ?
        GROUP BY competencia`,
      [userId, ano],
    );

    return rows.map((row) => ({
      competencia: row.competencia,
      comNf: toNumber(row.comNf),
      semNf: toNumber(row.semNf),
      total: toNumber(row.total),
      quantidade: Number(row.quantidade || 0),
    }));
  }

  /** Orçamentos aprovados que ainda não viraram recibo. */
  async aReceber(userId: string): Promise<{ valor: number; quantidade: number }> {
    const row = await this.db.queryOne<{ valor: number; quantidade: number }>(
      `SELECT COALESCE(SUM(o.valorTotal), 0) AS valor, COUNT(*) AS quantidade
         FROM orcamentos o
        WHERE o.userId = ?
          AND o.status = 'aprovado'
          AND NOT EXISTS (
            SELECT 1 FROM recibos r WHERE r.orcamentoId = o.id AND r.userId = o.userId
          )`,
      [userId],
    );
    return { valor: toNumber(row?.valor), quantidade: Number(row?.quantidade || 0) };
  }

  async orcamentosAprovadosNoMes(userId: string, competencia: string): Promise<number> {
    const row = await this.db.queryOne<{ total: number }>(
      `SELECT COUNT(*) AS total FROM orcamentos
        WHERE userId = ? AND status = 'aprovado'
          AND DATE_FORMAT(updatedAt, '%Y-%m') = ?`,
      [userId, competencia],
    );
    return Number(row?.total || 0);
  }

  async listarDas(userId: string, ano: number): Promise<DasRow[]> {
    return this.db.query<DasRow>(
      `SELECT competencia, valor, status, pagoEm
         FROM das_pagamentos
        WHERE userId = ? AND competencia LIKE ?`,
      [userId, `${ano}-%`],
    );
  }

  async registrarPagamentoDas(userId: string, competencia: string, valor: number): Promise<void> {
    await this.db.mutate(
      `INSERT INTO das_pagamentos (id, userId, competencia, valor, status, pagoEm)
       VALUES (?, ?, ?, ?, 'pago', CURDATE())
       ON DUPLICATE KEY UPDATE status = 'pago', pagoEm = CURDATE(), valor = VALUES(valor)`,
      [randomUUID(), userId, competencia, valor],
    );
  }
}
