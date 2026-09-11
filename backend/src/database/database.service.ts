import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import mysql, { Pool, PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

/** Tipos aceitos como parâmetro de prepared statement. */
export type SqlParam = string | number | boolean | Date | Buffer | null;

/**
 * Acesso único ao MySQL. Todo SQL do projeto passa por aqui (via repositories),
 * nunca direto de um service ou controller.
 */
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool!: Pool;

  onModuleInit() {
    this.pool = mysql.createPool(DatabaseService.buildConfig());
    this.logger.log(
      `Pool MySQL criado em ${process.env.DATABASE_HOST || 'localhost'}:${process.env.DATABASE_PORT || 3306}`,
    );
  }

  async onModuleDestroy() {
    await this.pool?.end();
  }

  static buildConfig(): mysql.PoolOptions {
    return {
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER || 'trampo_user',
      password: process.env.DATABASE_PASSWORD || 'trampo_password',
      database: process.env.DATABASE_NAME || 'trampocerto',
      charset: 'utf8mb4',
      timezone: 'Z',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      decimalNumbers: true,
    };
  }

  getPool(): Pool {
    return this.pool;
  }

  /** SELECT/INSERT/UPDATE/DELETE parametrizados (prepared statements). */
  async query<T = RowDataPacket>(sql: string, params: SqlParam[] = []): Promise<T[]> {
    const [rows] = await this.pool.execute(sql, params);
    return rows as T[];
  }

  async queryOne<T = RowDataPacket>(sql: string, params: SqlParam[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  }

  /** INSERT/UPDATE/DELETE: devolve o resultado com affectedRows/insertId. */
  async mutate(sql: string, params: SqlParam[] = []): Promise<ResultSetHeader> {
    const [result] = await this.pool.execute<ResultSetHeader>(sql, params);
    return result;
  }

  /** Statements sem parâmetros (DDL) — prepared statements não aceitam DDL. */
  async raw(sql: string): Promise<void> {
    await this.pool.query(sql);
  }

  /** Executa o callback dentro de uma transação, com rollback automático. */
  async transaction<T>(work: (conn: PoolConnection) => Promise<T>): Promise<T> {
    const conn = await this.pool.getConnection();
    try {
      await conn.beginTransaction();
      const result = await work(conn);
      await conn.commit();
      return result;
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}
