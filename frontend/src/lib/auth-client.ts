import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { getAuthBaseUrl } from './runtime-config';

/**
 * Cliente do Better Auth. O cookie de sessão é emitido pelo backend em
 * /api/auth e enviado em toda chamada da API (ver lib/api/http.ts).
 */
export const authClient = createAuthClient({
  // Resolvida em runtime: ver lib/runtime-config.ts.
  baseURL: getAuthBaseUrl(),
  plugins: [
    // Espelha os campos extras declarados no backend (auth/auth.config.ts),
    // para que signUp e a sessão carreguem o perfil MEI completo.
    inferAdditionalFields({
      user: {
        ocupacao: { type: 'string', required: false },
        cnpj: { type: 'string', required: false },
        telefone: { type: 'string', required: false },
        cidade: { type: 'string', required: false },
        chavePix: { type: 'string', required: false },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;

/** Mensagem de erro do Better Auth traduzida para o usuário final. */
export function traduzirErroAuth(codigo: string | undefined, fallback: string): string {
  const mensagens: Record<string, string> = {
    INVALID_EMAIL_OR_PASSWORD: 'E-mail ou senha incorretos.',
    USER_ALREADY_EXISTS: 'Já existe uma conta com este e-mail.',
    PASSWORD_TOO_SHORT: 'A senha precisa ter ao menos 8 caracteres.',
    INVALID_EMAIL: 'Informe um e-mail válido.',
  };
  return (codigo && mensagens[codigo]) || fallback;
}
