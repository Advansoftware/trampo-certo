import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DatabaseService } from '../database/database.service';
import { buildCodigo, parseSequencial } from '../common/utils/codigo.util';
import { toMysqlDateTime } from '../common/utils/date.util';
import { round2, toNumber } from '../common/utils/number.util';
import { FORMA_PAGAMENTO_LABEL, FormaPagamento, Recibo } from './recibo.entity';
import { ReciboPayload } from './dto/recibo.dto';

interface ReciboRow {
  id: string;
  codigo: string;
  clienteId: string | null;
  orcamentoId: string | null;
  propostaCodigo: string | null;
  clienteNome: string;
  clienteDocumento: string | null;
  clienteTelefone: string | null;
  servicoDescricao: string | null;
  valor: number | null;
  valorExtenso: string | null;
  formaPagamento: FormaPagamento;
  formaPagamentoLabel: string | null;
  comNotaFiscal: number | boolean;
  dataPagamento: Date;
  autenticacao: string;
  createdAt: Date;
}

export interface ReciboInsert extends ReciboPayload {
  valorExtenso: string;
  propostaCodigo: string | null;
  autenticacao: string;
}

@Injectable()
export class RecibosRepository {
  constructor(private readonly db: DatabaseService) {}

  async findAll(userId: string): Promise<Recibo[]> {
    const rows = await this.db.query<ReciboRow>(
      'SELECT * FROM recibos WHERE userId = ? ORDER BY dataPagamento DESC, createdAt DESC',
      [userId],
    );
    return rows.map(toRecibo);
  }

  async findById(userId: string, id: string): Promise<Recibo | null> {
    const row = await this.db.queryOne<ReciboRow>('SELECT * FROM recibos WHERE userId = ? AND id = ?', [userId, id]);
    return row ? toRecibo(row) : null;
  }

  async create(userId: string, payload: ReciboInsert): Promise<string> {
    const id = randomUUID();
    const codigo = await this.proximoCodigo(userId);

    await this.db.mutate(
      `INSERT INTO recibos
        (id, codigo, userId, clienteId, orcamentoId, propostaCodigo, clienteNome, clienteDocumento,
         clienteTelefone, servicoDescricao, valor, valorExtenso, formaPagamento, formaPagamentoLabel,
         comNotaFiscal, dataPagamento, autenticacao)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        codigo,
        userId,
        payload.clienteId,
        payload.orcamentoId,
        payload.propostaCodigo,
        payload.clienteNome,
        payload.clienteDocumento,
        payload.clienteTelefone,
        payload.servicoDescricao,
        round2(payload.valor),
        payload.valorExtenso,
        payload.formaPagamento,
        FORMA_PAGAMENTO_LABEL[payload.formaPagamento],
        payload.comNotaFiscal,
        toMysqlDateTime(payload.dataPagamento),
        payload.autenticacao,
      ],
    );
    return id;
  }

  async remove(userId: string, id: string): Promise<number> {
    const result = await this.db.mutate('DELETE FROM recibos WHERE userId = ? AND id = ?', [userId, id]);
    return result.affectedRows;
  }

  private async proximoCodigo(userId: string): Promise<string> {
    const ano = new Date().getFullYear();
    const rows = await this.db.query<{ codigo: string }>(
      `SELECT codigo FROM recibos
        WHERE userId = ? AND codigo LIKE ?
        ORDER BY LENGTH(codigo) DESC, codigo DESC
        LIMIT 1`,
      [userId, `REC-${ano}-%`],
    );
    return buildCodigo('REC', ano, parseSequencial(rows[0]?.codigo) + 1);
  }
}

function toRecibo(row: ReciboRow): Recibo {
  return {
    id: row.id,
    codigo: row.codigo,
    clienteId: row.clienteId,
    orcamentoId: row.orcamentoId,
    propostaCodigo: row.propostaCodigo || '',
    clienteNome: row.clienteNome,
    clienteDocumento: row.clienteDocumento || '',
    clienteTelefone: row.clienteTelefone || '',
    servicoDescricao: row.servicoDescricao || '',
    valor: round2(toNumber(row.valor)),
    valorExtenso: row.valorExtenso || '',
    formaPagamento: row.formaPagamento,
    formaPagamentoLabel: row.formaPagamentoLabel || FORMA_PAGAMENTO_LABEL[row.formaPagamento] || '',
    comNotaFiscal: Boolean(row.comNotaFiscal),
    dataPagamento: new Date(row.dataPagamento).toISOString(),
    autenticacao: row.autenticacao,
    createdAt: new Date(row.createdAt).toISOString(),
  };
}
