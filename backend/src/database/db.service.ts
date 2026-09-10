import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import mysql, { Pool } from 'mysql2/promise';

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  onModuleInit() {
    this.pool = mysql.createPool({
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER || 'trampo_user',
      password: process.env.DATABASE_PASSWORD || 'trampo_password',
      database: process.env.DATABASE_NAME || 'trampocerto',
      charset: 'utf8mb4',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
    }
  }

  getPool(): Pool {
    return this.pool;
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const [rows] = await this.pool.execute(sql, params);
    return rows as T[];
  }
}
