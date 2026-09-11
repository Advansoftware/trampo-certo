import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DatabaseService, SqlParam } from '../database/database.service';
import { formatBrDate } from '../common/utils/date.util';
import { round2, toNumber } from '../common/utils/number.util';
import { Cliente, ClienteStatus, ClienteTipo } from './cliente.entity';
import { ClientePayload } from './dto/cliente.dto';

interface ClienteRow {
  id: string;
  nome: string;
  tipo: ClienteTipo;
  documento: string | null;
  telefone: string | null;
  email: string | null;
  cidade: string | null;
  bairro: string | null;
  observacoes: string | null;
  status: ClienteStatus;
  tags: unknown;
  createdAt: Date;
  totalPropostas: number | null;
  propostasAprovadas: number | null;
  totalFaturado: number | null;
  ultimoServico: Date | null;
}

/**
 * Agregados (faturamento, propostas, último serviço) vêm de subqueries:
 * nunca ficam desatualizados como aconteceria com colunas materializadas.
 */
const SELECT_CLIENTE = `
  SELECT c.*,
    (SELECT COUNT(*) FROM orcamentos o
      WHERE o.clienteId = c.id AND o.userId = c.userId) AS totalPropostas,
    (SELECT COUNT(*) FROM orcamentos o
      WHERE o.clienteId = c.id AND o.userId = c.userId AND o.status = 'aprovado') AS propostasAprovadas,
    (SELECT COALESCE(SUM(r.valor), 0) FROM recibos r
      WHERE r.clienteId = c.id AND r.userId = c.userId) AS totalFaturado,
    (SELECT MAX(r.dataPagamento) FROM recibos r
      WHERE r.clienteId = c.id AND r.userId = c.userId) AS ultimoServico
  FROM clientes c
`;

@Injectable()
export class ClientesRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAll(userId: string): Promise<Cliente[]> {
    const rows = await this.db.query<ClienteRow>(
      `${SELECT_CLIENTE} WHERE c.userId = ? ORDER BY c.nome ASC`,
      [userId],
    );
    return rows.map(toCliente);
  }

  async findById(userId: string, id: string): Promise<Cliente | null> {
    const row = await this.db.queryOne<ClienteRow>(
      `${SELECT_CLIENTE} WHERE c.userId = ? AND c.id = ?`,
      [userId, id],
    );
    return row ? toCliente(row) : null;
  }

  async findByDocumento(userId: string, documento: string): Promise<Cliente | null> {
    const row = await this.db.queryOne<ClienteRow>(
      `${SELECT_CLIENTE} WHERE c.userId = ? AND c.documento = ?`,
      [userId, documento],
    );
    return row ? toCliente(row) : null;
  }

  async create(userId: string, payload: ClientePayload): Promise<string> {
    const id = randomUUID();
    await this.db.mutate(
      `INSERT INTO clientes
        (id, userId, nome, tipo, documento, telefone, email, cidade, bairro, observacoes, status, tags)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        payload.nome,
        payload.tipo,
        payload.documento,
        payload.telefone,
        payload.email,
        payload.cidade,
        payload.bairro,
        payload.observacoes,
        payload.status,
        JSON.stringify(payload.tags),
      ],
    );
    return id;
  }

  /** @returns quantas linhas foram alteradas — 0 significa "não existe para este usuário". */
  async update(userId: string, id: string, updates: Partial<ClientePayload>): Promise<number> {
    const columns: string[] = [];
    const values: SqlParam[] = [];

    for (const [key, value] of Object.entries(updates)) {
      columns.push(`${key} = ?`);
      values.push(key === 'tags' ? JSON.stringify(value) : (value as SqlParam));
    }
    if (columns.length === 0) return 0;

    const result = await this.db.mutate(
      `UPDATE clientes SET ${columns.join(', ')} WHERE userId = ? AND id = ?`,
      [...values, userId, id],
    );
    return result.affectedRows;
  }

  async remove(userId: string, id: string): Promise<number> {
    const result = await this.db.mutate('DELETE FROM clientes WHERE userId = ? AND id = ?', [userId, id]);
    return result.affectedRows;
  }
}

function parseTags(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((tag): tag is string => typeof tag === 'string');
  if (typeof value === 'string') {
    try {
      const parsed: unknown = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter((tag): tag is string => typeof tag === 'string') : [];
    } catch {
      return [];
    }
  }
  return [];
}

function toCliente(row: ClienteRow): Cliente {
  return {
    id: row.id,
    nome: row.nome,
    tipo: row.tipo,
    documento: row.documento || '',
    telefone: row.telefone || '',
    email: row.email || '',
    cidade: row.cidade || '',
    bairro: row.bairro || '',
    observacoes: row.observacoes,
    status: row.status,
    tags: parseTags(row.tags),
    totalFaturado: round2(toNumber(row.totalFaturado)),
    totalPropostas: Number(row.totalPropostas || 0),
    propostasAprovadas: Number(row.propostasAprovadas || 0),
    ultimoServico: formatBrDate(row.ultimoServico) || '',
    createdAt: new Date(row.createdAt).toISOString(),
  };
}
