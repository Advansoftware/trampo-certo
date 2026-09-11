import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { auth, AuthUser } from '../../auth/auth.config';

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

/**
 * Exige uma sessão válida do Better Auth e injeta o usuário na request.
 * Aplicado nos controllers de negócio — nenhum dado é servido sem sessão.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    if (!session?.user) {
      throw new UnauthorizedException('Sessão inválida ou expirada. Faça login novamente.');
    }

    request.user = session.user;
    return true;
  }
}
