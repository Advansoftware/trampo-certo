import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import mysql from 'mysql2/promise';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';
import { sincronizarSchema } from './database/schema.runner';
import { origensPermitidas } from './common/utils/origins.util';

const AUTH_PREFIX = '/api/auth';

/**
 * O handler do Better Auth precisa do corpo cru da requisição, então o
 * body-parser do Express é aplicado a todas as rotas *menos* /api/auth/*.
 */
function bodyParserExcetoAuth(parser: express.RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) =>
    req.originalUrl.startsWith(AUTH_PREFIX) ? next() : parser(req, res, next);
}

/**
 * Garante o schema antes de qualquer módulo subir.
 *
 * Num banco novo as tabelas do Better Auth ainda não existem; ele só é
 * instanciado depois disto (ver auth.config.ts), para a primeira instalação
 * não subir sem conta de acesso.
 */
async function prepararBanco(logger: Logger): Promise<void> {
  const pool = mysql.createPool(DatabaseService.buildConfig());
  try {
    await sincronizarSchema(pool, (mensagem) => logger.log(mensagem));
    logger.log('Schema do banco pronto');
  } finally {
    await pool.end();
  }
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  await prepararBanco(logger);

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bodyParser: false });

  app.use(bodyParserExcetoAuth(express.json({ limit: '2mb' })));
  app.use(bodyParserExcetoAuth(express.urlencoded({ extended: true })));

  // Atrás do proxy do Coolify/Traefik: preserva o protocolo original (https)
  // para cookies seguros e para os links gerados pela aplicação.
  app.set('trust proxy', 1);

  const origens = origensPermitidas();
  app.enableCors({
    // Sem FRONTEND_URL configurada, o app é servido pelo mesmo domínio da API
    // (proxy do Next) e nenhuma origem externa precisa ser liberada.
    origin: origens.length > 0 ? origens : false,
    credentials: true,
  });
  logger.log(origens.length > 0 ? `CORS liberado para: ${origens.join(', ')}` : 'CORS restrito à mesma origem');

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');
  logger.log(`TrampoCerto API ouvindo na porta ${port}`);
}

void bootstrap();
