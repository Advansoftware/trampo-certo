import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import { AppModule } from './app.module';

const AUTH_PREFIX = '/api/auth';

/**
 * O handler do Better Auth precisa do corpo cru da requisição, então o
 * body-parser do Express é aplicado a todas as rotas *menos* /api/auth/*.
 */
function bodyParserExcetoAuth(parser: express.RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) =>
    req.originalUrl.startsWith(AUTH_PREFIX) ? next() : parser(req, res, next);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.use(bodyParserExcetoAuth(express.json({ limit: '2mb' })));
  app.use(bodyParserExcetoAuth(express.urlencoded({ extended: true })));

  const origins = [process.env.FRONTEND_URL, 'http://localhost:3000'].filter(
    (origin): origin is string => Boolean(origin),
  );
  app.enableCors({
    origin: Array.from(new Set(origins)),
    credentials: true,
  });

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);
  new Logger('Bootstrap').log(`TrampoCerto API ouvindo na porta ${port}`);
}

void bootstrap();
