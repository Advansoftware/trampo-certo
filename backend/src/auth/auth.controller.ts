import { All, Controller, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { getAuth } from './auth.config';

let handler: ReturnType<typeof toNodeHandler> | null = null;

/** Criado no primeiro request, quando o schema do banco já está pronto. */
function getHandler() {
  if (!handler) handler = toNodeHandler(getAuth());
  return handler;
}

/**
 * Encaminha /api/auth/* para o Better Auth.
 * O corpo destas rotas NÃO passa pelo body-parser do Nest (ver main.ts):
 * o handler do Better Auth precisa do stream cru.
 */
@Controller('api/auth')
export class AuthController {
  @All('*path')
  handle(@Req() req: Request, @Res() res: Response) {
    return getHandler()(req, res);
  }
}
