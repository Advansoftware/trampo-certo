import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { sincronizarSchema } from './schema.runner';

/**
 * Reaplica o schema quando a aplicação sobe pelo Nest (dev com hot-reload,
 * testes). Em produção o schema já foi garantido antes do boot, em main.ts;
 * como a rotina é idempotente, rodar de novo é barato e inofensivo.
 */
@Injectable()
export class SchemaService implements OnModuleInit {
  private readonly logger = new Logger(SchemaService.name);

  constructor(private readonly db: DatabaseService) {}

  async onModuleInit() {
    await sincronizarSchema(this.db.getPool(), (mensagem) => this.logger.log(mensagem));
    this.logger.log('Schema sincronizado');
  }
}
