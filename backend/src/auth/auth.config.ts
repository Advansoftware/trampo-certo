import { betterAuth } from 'better-auth';
import mysql from 'mysql2/promise';
import { DatabaseService } from '../database/database.service';

/**
 * Instância única do Better Auth.
 *
 * Usa o mesmo MySQL da aplicação (tabelas user/session/account/verification)
 * e estende o usuário com os campos do perfil MEI, que o front lê direto da sessão.
 */
const authPool = mysql.createPool(DatabaseService.buildConfig());

export const auth = betterAuth({
  database: authPool,
  secret: process.env.BETTER_AUTH_SECRET || 'trampo_certo_jwt_secret_dev_key_987654321',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:4005',
  basePath: '/api/auth',
  trustedOrigins: [process.env.FRONTEND_URL || 'http://localhost:3000'],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  user: {
    additionalFields: {
      ocupacao: { type: 'string', required: false, input: true },
      cnpj: { type: 'string', required: false, input: true },
      telefone: { type: 'string', required: false, input: true, fieldName: 'phone' },
      cidade: { type: 'string', required: false, input: true },
      chavePix: { type: 'string', required: false, input: true },
    },
  },
});

export type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;
export type AuthUser = NonNullable<AuthSession>['user'];
