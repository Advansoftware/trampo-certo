import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { getAuth, AuthUser } from '../../auth/auth.config';
import { DatabaseService } from '../../database/database.service';

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

interface StatusRow {
  status: 'ativo' | 'bloqueado' | null;
}

/**
 * Exige uma sessão válida do Better Auth e injeta o usuário na request.
 * Aplicado nos controllers de negócio — nenhum dado é servido sem sessão.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly db: DatabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const session = await getAuth().api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    if (!session?.user) {
      throw new UnauthorizedException('Sessão inválida ou expirada. Faça login novamente.');
    }

    // O bloqueio é consultado a cada request: sem isso, quem já está logado
    // continuaria usando o app até a sessão expirar, 30 dias depois.
    const row = await this.db.queryOne<StatusRow>('SELECT status FROM user WHERE id = ?', [
      session.user.id,
    ]);

    if (row?.status === 'bloqueado') {
      throw new ForbiddenException('Sua conta está bloqueada. Fale com o administrador.');
    }

    request.user = session.user;
    return true;
  }
}
