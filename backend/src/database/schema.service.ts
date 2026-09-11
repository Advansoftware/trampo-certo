import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ALTER_STATEMENTS, COLUMN_PATCHES, SCHEMA_STATEMENTS } from './schema';

/**
 * Converge o banco para o schema declarado em schema.ts a cada boot.
 * Idempotente: pode rodar quantas vezes for necessário.
 */
@Injectable()
export class SchemaService implements OnModuleInit {
  private readonly logger = new Logger(SchemaService.name);

  constructor(private readonly db: DatabaseService) {}

  async onModuleInit() {
    await this.waitForDatabase();
    await this.createTables();
    await this.applyColumnPatches();
    await this.applyAlters();
    this.logger.log('Schema sincronizado');
  }

  private async waitForDatabase(attempts = 20): Promise<void> {
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        await this.db.raw('SELECT 1');
        return;
      } catch (error) {
        if (attempt === attempts) throw error;
        this.logger.warn(`Banco indisponível (tentativa ${attempt}/${attempts}), aguardando...`);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }
  }

  private async createTables(): Promise<void> {
    for (const statement of SCHEMA_STATEMENTS) {
      await this.db.raw(statement);
    }
  }

  private async applyColumnPatches(): Promise<void> {
    for (const patch of COLUMN_PATCHES) {
      if (await this.hasColumn(patch.table, patch.column)) continue;
      await this.db.raw(patch.ddl);
      this.logger.log(`Coluna ${patch.table}.${patch.column} criada`);
    }
  }

  private async applyAlters(): Promise<void> {
    for (const statement of ALTER_STATEMENTS) {
      try {
        await this.db.raw(statement);
      } catch (error) {
        this.logger.warn(`ALTER ignorado: ${(error as Error).message}`);
      }
    }
  }

  private async hasColumn(table: string, column: string): Promise<boolean> {
    const row = await this.db.queryOne<{ total: number }>(
      `SELECT COUNT(*) AS total
         FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
      [table, column],
    );
    return Number(row?.total || 0) > 0;
  }
}
