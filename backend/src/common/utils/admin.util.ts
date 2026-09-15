/**
 * O administrador é a conta cujo e-mail está em DEMO_USER_EMAIL — a mesma
 * variável que cria a conta inicial no primeiro boot.
 *
 * Com a variável vazia, ninguém é administrador: o módulo /api/admin fica
 * inacessível em vez de liberar para todo mundo.
 */
export function emailAdmin(): string {
  return (process.env.DEMO_USER_EMAIL || '').trim().toLowerCase();
}

export function ehAdmin(email: string | null | undefined): boolean {
  const admin = emailAdmin();
  if (!admin) return false;
  return (email || '').trim().toLowerCase() === admin;
}
