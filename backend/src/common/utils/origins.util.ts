/**
 * Origens confiáveis do frontend.
 *
 * `FRONTEND_URL` aceita uma lista separada por vírgula — em produção o app pode
 * responder por mais de um domínio (ex.: domínio próprio + subdomínio do Coolify).
 * Em desenvolvimento, o localhost é acrescentado automaticamente.
 */
export function origensPermitidas(): string[] {
  const configuradas = (process.env.FRONTEND_URL || '')
    .split(',')
    .map((origem) => origem.trim().replace(/\/+$/, ''))
    .filter(Boolean);

  const padroes = process.env.NODE_ENV === 'production' ? [] : ['http://localhost:3000'];

  return Array.from(new Set([...configuradas, ...padroes]));
}
