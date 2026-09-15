import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Plano, RecursoLimitado, UsoMensal } from './plano.entity';

interface ContagemRow {
  total: number;
}

interface PlanoRow {
  plano: Plano | null;
}

/** Tabela consultada para contar o uso de cada recurso limitado. */
const TABELA_DO_RECURSO: Record<RecursoLimitado, string> = {
  orcamentos: 'orcamentos',
  recibos: 'recibos',
};

@Injectable()
export class PlanosRepository {
  constructor(private readonly db: DatabaseService) {}

  async planoDoUsuario(userId: string): Promise<Plano> {
    const row = await this.db.queryOne<PlanoRow>('SELECT plano FROM user WHERE id = ?', [userId]);
    return row?.plano ?? 'gratuito';
  }

  /**
   * Quantos registros o usuário criou no mês corrente.
   * A cota é por mês-calendário: vira sozinha na virada do mês.
   */
  async contarNoMes(userId: string, recurso: RecursoLimitado): Promise<number> {
    const row = await this.db.queryOne<ContagemRow>(
      `SELECT COUNT(*) AS total
         FROM ${TABELA_DO_RECURSO[recurso]}
        WHERE userId = ?
          AND YEAR(createdAt) = YEAR(CURDATE())
          AND MONTH(createdAt) = MONTH(CURDATE())`,
      [userId],
    );
    return Number(row?.total || 0);
  }

  async usoDoMes(userId: string): Promise<UsoMensal> {
    const [orcamentos, recibos] = await Promise.all([
      this.contarNoMes(userId, 'orcamentos'),
      this.contarNoMes(userId, 'recibos'),
    ]);
    return { orcamentos, recibos };
  }
}
