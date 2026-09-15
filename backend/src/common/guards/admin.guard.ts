import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import type { AuthenticatedRequest } from './auth.guard';
import { ehAdmin } from '../utils/admin.util';

/**
 * Libera as rotas administrativas só para a conta definida no .env.
 * Usar sempre depois do AuthGuard, que é quem preenche request.user.
 */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!ehAdmin(request.user?.email)) {
      throw new ForbiddenException('Área restrita ao administrador.');
    }

    return true;
  }
}
