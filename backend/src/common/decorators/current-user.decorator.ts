import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import type { AuthenticatedRequest } from '../guards/auth.guard';
import type { AuthUser } from '../../auth/auth.config';

/**
 * `@CurrentUser()` devolve o usuário da sessão;
 * `@CurrentUser('id')` devolve só o id — o escopo de toda query de negócio.
 */
export const CurrentUser = createParamDecorator(
  (field: keyof AuthUser | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;
    if (!user) throw new UnauthorizedException('Usuário não autenticado.');
    return field ? user[field] : user;
  },
);
