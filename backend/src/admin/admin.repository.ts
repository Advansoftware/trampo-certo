import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Plano, StatusUsuario } from '../planos/plano.entity';
import { ehAdmin } from '../common/utils/admin.util';
import { UsuarioAdmin } from './admin.entity';

interface UsuarioRow {
  id: string;
  name: string;
  email: string;
  ocupacao: string | null;
  cidade: string | null;
  cnpj: string | null;
  plano: Plano | null;
  status: StatusUsuario | null;
  createdAt: Date | string;
  totalOrcamentos: number;
  totalRecibos: number;
  totalClientes: number;
}

export interface UsuarioUpdates {
  plano?: Plano;
  status?: StatusUsuario;
}

@Injectable()
export class AdminRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<UsuarioAdmin[]> {
    const rows = await this.db.query<UsuarioRow>(
      `SELECT u.id, u.name, u.email, u.ocupacao, u.cidade, u.cnpj, u.plano, u.status, u.createdAt,
              (SELECT COUNT(*) FROM orcamentos o WHERE o.userId = u.id) AS totalOrcamentos,
              (SELECT COUNT(*) FROM recibos r WHERE r.userId = u.id) AS totalRecibos,
              (SELECT COUNT(*) FROM clientes c WHERE c.userId = u.id) AS totalClientes
         FROM user u
        ORDER BY u.createdAt DESC`,
    );

    return rows.map(toUsuarioAdmin);
  }

  async findById(id: string): Promise<UsuarioAdmin | null> {
    const row = await this.db.queryOne<UsuarioRow>(
      `SELECT u.id, u.name, u.email, u.ocupacao, u.cidade, u.cnpj, u.plano, u.status, u.createdAt,
              (SELECT COUNT(*) FROM orcamentos o WHERE o.userId = u.id) AS totalOrcamentos,
              (SELECT COUNT(*) FROM recibos r WHERE r.userId = u.id) AS totalRecibos,
              (SELECT COUNT(*) FROM clientes c WHERE c.userId = u.id) AS totalClientes
         FROM user u
        WHERE u.id = ?`,
      [id],
    );

    return row ? toUsuarioAdmin(row) : null;
  }

  async update(id: string, updates: UsuarioUpdates): Promise<number> {
    const colunas: string[] = [];
    const valores: string[] = [];

    if (updates.plano) {
      colunas.push('plano = ?');
      valores.push(updates.plano);
    }
    if (updates.status) {
      colunas.push('status = ?');
      valores.push(updates.status);
    }
    if (colunas.length === 0) return 0;

    const resultado = await this.db.mutate(`UPDATE user SET ${colunas.join(', ')} WHERE id = ?`, [
      ...valores,
      id,
    ]);
    return resultado.affectedRows;
  }

  /** O ON DELETE CASCADE do schema leva junto orçamentos, recibos e clientes. */
  async remove(id: string): Promise<number> {
    const resultado = await this.db.mutate('DELETE FROM user WHERE id = ?', [id]);
    return resultado.affectedRows;
  }
}

function toUsuarioAdmin(row: UsuarioRow): UsuarioAdmin {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    ocupacao: row.ocupacao || '',
    cidade: row.cidade || '',
    cnpj: row.cnpj || '',
    plano: row.plano ?? 'gratuito',
    status: row.status ?? 'ativo',
    admin: ehAdmin(row.email),
    criadoEm: new Date(row.createdAt).toISOString(),
    totalOrcamentos: Number(row.totalOrcamentos || 0),
    totalRecibos: Number(row.totalRecibos || 0),
    totalClientes: Number(row.totalClientes || 0),
  };
}
