import mysql, { Pool } from 'mysql2/promise';
import { ALTER_STATEMENTS, COLUMN_PATCHES, SCHEMA_STATEMENTS } from './schema';

type Log = (mensagem: string) => void;

async function aguardarBanco(pool: Pool, log: Log, tentativas = 30): Promise<void> {
  for (let tentativa = 1; tentativa <= tentativas; tentativa++) {
    try {
      await pool.query('SELECT 1');
      return;
    } catch (erro) {
      if (tentativa === tentativas) throw erro;
      log(`Banco indisponível (tentativa ${tentativa}/${tentativas}), aguardando...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

async function temColuna(pool: Pool, tabela: string, coluna: string): Promise<boolean> {
  const [linhas] = await pool.execute<mysql.RowDataPacket[]>(
    `SELECT COUNT(*) AS total
       FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [tabela, coluna],
  );
  return Number(linhas[0]?.total || 0) > 0;
}

/**
 * Aplica o schema declarado em schema.ts. Idempotente: pode rodar em banco
 * vazio ou já populado, quantas vezes for necessário.
 *
 * Roda antes de qualquer coisa no boot (ver main.ts) porque o Better Auth
 * valida as tabelas ao ser carregado — num banco novo ele falharia e a conta
 * inicial nunca seria criada.
 */
export async function sincronizarSchema(pool: Pool, log: Log = () => {}): Promise<void> {
  await aguardarBanco(pool, log);

  for (const statement of SCHEMA_STATEMENTS) {
    await pool.query(statement);
  }

  for (const patch of COLUMN_PATCHES) {
    if (await temColuna(pool, patch.table, patch.column)) continue;
    await pool.query(patch.ddl);
    log(`Coluna ${patch.table}.${patch.column} criada`);
  }

  for (const statement of ALTER_STATEMENTS) {
    try {
      await pool.query(statement);
    } catch (erro) {
      log(`ALTER ignorado: ${(erro as Error).message}`);
    }
  }
}
