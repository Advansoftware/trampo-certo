import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DatabaseService } from '../database/database.service';
import { buildCodigo, parseSequencial } from '../common/utils/codigo.util';
import { round2, toNumber } from '../common/utils/number.util';
import { ItemOrcamento, Orcamento, OrcamentoStatus } from './orcamento.entity';
import { OrcamentoPayload } from './dto/orcamento.dto';

interface OrcamentoRow {
  id: string;
  codigo: string;
  clienteId: string | null;
  clienteNome: string;
  clienteTelefone: string | null;
  clienteEmail: string | null;
  clienteDocumento: string | null;
  clienteLocalizacao: string | null;
  servicoDescricao: string | null;
  valorTotal: number | null;
  desconto: number | null;
  condicoesPagamento: string | null;
  chavePix: string | null;
  validade: string | null;
  observacoes: string | null;
  status: OrcamentoStatus;
  itens: unknown;
  createdAt: Date;
  updatedAt: Date;
}

const COLUNAS_EDITAVEIS = `
  clienteId = ?, clienteNome = ?, clienteTelefone = ?, clienteEmail = ?, clienteDocumento = ?,
  clienteLocalizacao = ?, servicoDescricao = ?, valorTotal = ?, desconto = ?,
  condicoesPagamento = ?, chavePix = ?, validade = ?, observacoes = ?, itens = ?
`;

@Injectable()
export class OrcamentosRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAll(userId: string): Promise<Orcamento[]> {
    const rows = await this.db.query<OrcamentoRow>(
      'SELECT * FROM orcamentos WHERE userId = ? ORDER BY createdAt DESC',
      [userId],
    );
    return rows.map(toOrcamento);
  }

  async findById(userId: string, id: string): Promise<Orcamento | null> {
    const row = await this.db.queryOne<OrcamentoRow>(
      'SELECT * FROM orcamentos WHERE userId = ? AND id = ?',
      [userId, id],
    );
    return row ? toOrcamento(row) : null;
  }

  async create(userId: string, payload: OrcamentoPayload): Promise<string> {
    const id = randomUUID();
    const codigo = await this.proximoCodigo(userId);

    await this.db.mutate(
      `INSERT INTO orcamentos
        (id, codigo, userId, clienteId, clienteNome, clienteTelefone, clienteEmail, clienteDocumento,
         clienteLocalizacao, servicoDescricao, valorTotal, desconto, condicoesPagamento, chavePix,
         validade, observacoes, status, itens)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        codigo,
        userId,
        payload.clienteId,
        payload.clienteNome,
        payload.clienteTelefone,
        payload.clienteEmail,
        payload.clienteDocumento,
        payload.clienteLocalizacao,
        payload.servicoDescricao,
        payload.valorTotal,
        payload.desconto,
        payload.condicoesPagamento,
        payload.chavePix,
        payload.validade,
        payload.observacoes,
        payload.status,
        JSON.stringify(payload.itens),
      ],
    );
    return id;
  }

  async update(userId: string, id: string, payload: OrcamentoPayload): Promise<number> {
    const result = await this.db.mutate(
      `UPDATE orcamentos SET ${COLUNAS_EDITAVEIS} WHERE userId = ? AND id = ?`,
      [
        payload.clienteId,
        payload.clienteNome,
        payload.clienteTelefone,
        payload.clienteEmail,
        payload.clienteDocumento,
        payload.clienteLocalizacao,
        payload.servicoDescricao,
        payload.valorTotal,
        payload.desconto,
        payload.condicoesPagamento,
        payload.chavePix,
        payload.validade,
        payload.observacoes,
        JSON.stringify(payload.itens),
        userId,
        id,
      ],
    );
    return result.affectedRows;
  }

  async updateStatus(userId: string, id: string, status: OrcamentoStatus): Promise<number> {
    const result = await this.db.mutate(
      'UPDATE orcamentos SET status = ? WHERE userId = ? AND id = ?',
      [status, userId, id],
    );
    return result.affectedRows;
  }

  async remove(userId: string, id: string): Promise<number> {
    const result = await this.db.mutate('DELETE FROM orcamentos WHERE userId = ? AND id = ?', [userId, id]);
    return result.affectedRows;
  }

  /** Sequencial por usuário e por ano: ORC-2026-001, ORC-2026-002, ... */
  private async proximoCodigo(userId: string): Promise<string> {
    const ano = new Date().getFullYear();
    const rows = await this.db.query<{ codigo: string }>(
      `SELECT codigo FROM orcamentos
        WHERE userId = ? AND codigo LIKE ?
        ORDER BY LENGTH(codigo) DESC, codigo DESC
        LIMIT 1`,
      [userId, `ORC-${ano}-%`],
    );
    const ultimo = parseSequencial(rows[0]?.codigo);
    return buildCodigo('ORC', ano, ultimo + 1);
  }
}

function parseItens(value: unknown): ItemOrcamento[] {
  const raw: unknown = typeof value === 'string' ? safeJson(value) : value;
  if (!Array.isArray(raw)) return [];

  return raw.map((entry, index) => {
    const item = (entry ?? {}) as Record<string, unknown>;
    const qtd = toNumber(item.qtd, 1);
    const unitario = toNumber(item.unitario);
    return {
      id: typeof item.id === 'string' ? item.id : String(index + 1),
      descricao: typeof item.descricao === 'string' ? item.descricao : '',
      subDescricao: typeof item.subDescricao === 'string' ? item.subDescricao : null,
      unidade: typeof item.unidade === 'string' ? item.unidade : 'un',
      qtd,
      unitario,
      total: round2(toNumber(item.total, qtd * unitario)),
    };
  });
}

function safeJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function toOrcamento(row: OrcamentoRow): Orcamento {
  const itens = parseItens(row.itens);
  const subtotal = round2(itens.reduce((acc, item) => acc + item.total, 0));

  return {
    id: row.id,
    codigo: row.codigo,
    clienteId: row.clienteId,
    clienteNome: row.clienteNome,
    clienteTelefone: row.clienteTelefone || '',
    clienteEmail: row.clienteEmail || '',
    clienteDocumento: row.clienteDocumento || '',
    clienteLocalizacao: row.clienteLocalizacao || '',
    servicoDescricao: row.servicoDescricao || '',
    itens,
    subtotal,
    desconto: round2(toNumber(row.desconto)),
    valorTotal: round2(toNumber(row.valorTotal)),
    condicoesPagamento: row.condicoesPagamento || '',
    chavePix: row.chavePix || '',
    validade: row.validade || '',
    observacoes: row.observacoes || '',
    status: row.status,
    createdAt: new Date(row.createdAt).toISOString(),
    updatedAt: new Date(row.updatedAt).toISOString(),
  };
}
