/**
 * Códigos sequenciais por ano e por usuário: ORC-2026-001, REC-2026-001.
 * O sufixo vem do maior sequencial já gravado, então não há colisão silenciosa
 * como acontecia com o sufixo aleatório.
 */
export function buildCodigo(prefixo: 'ORC' | 'REC', ano: number, sequencial: number): string {
  return `${prefixo}-${ano}-${String(sequencial).padStart(3, '0')}`;
}

/** Extrai o sufixo sequencial de um código (ORC-2026-042 -> 42). */
export function parseSequencial(codigo: string | null | undefined): number {
  if (!codigo) return 0;
  const match = /-(\d+)$/.exec(codigo.trim());
  return match ? Number(match[1]) : 0;
}

/** Sufixo exibível de um código, preservando o formato original. */
export function sufixoCodigo(codigo: string | null | undefined): string {
  if (!codigo) return '';
  const match = /-(\d+)$/.exec(codigo.trim());
  return match ? match[1] : codigo.trim();
}
