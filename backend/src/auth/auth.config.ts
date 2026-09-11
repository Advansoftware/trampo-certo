import { betterAuth } from 'better-auth';
import mysql from 'mysql2/promise';
import { DatabaseService } from '../database/database.service';
import { origensPermitidas } from '../common/utils/origins.util';

function criarAuth() {
  return betterAuth({
    database: mysql.createPool(DatabaseService.buildConfig()),
    secret: process.env.BETTER_AUTH_SECRET || 'trampo_certo_jwt_secret_dev_key_987654321',
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:4005',
    basePath: '/api/auth',
    trustedOrigins: origensPermitidas(),
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
        // Produção usa HTTPS atrás do proxy; o cookie precisa ser secure.
        secure: process.env.NODE_ENV === 'production',
        // 'lax' cobre app e API no mesmo domínio ou em subdomínios do mesmo site.
        // Domínios completamente diferentes exigem AUTH_COOKIE_SAMESITE=none.
        sameSite: (process.env.AUTH_COOKIE_SAMESITE as 'lax' | 'strict' | 'none') || 'lax',
        // Opcional: '.seudominio.com' para compartilhar a sessão entre subdomínios.
        ...(process.env.AUTH_COOKIE_DOMAIN ? { domain: process.env.AUTH_COOKIE_DOMAIN } : {}),
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
}

let instancia: ReturnType<typeof criarAuth> | null = null;

/**
 * Instância única do Better Auth, criada sob demanda.
 *
 * A criação é adiada de propósito: o Better Auth valida as tabelas do banco
 * assim que é instanciado, e num banco novo elas só existem depois que o
 * schema é aplicado no boot (ver main.ts).
 */
export function getAuth(): ReturnType<typeof criarAuth> {
  if (!instancia) instancia = criarAuth();
  return instancia;
}

export type AuthInstance = ReturnType<typeof criarAuth>;
export type AuthSession = Awaited<ReturnType<AuthInstance['api']['getSession']>>;
export type AuthUser = NonNullable<AuthSession>['user'];
