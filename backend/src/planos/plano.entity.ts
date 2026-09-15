export type Plano = 'gratuito' | 'pro';
export type StatusUsuario = 'ativo' | 'bloqueado';

export const PLANOS: Plano[] = ['gratuito', 'pro'];
export const STATUS_USUARIO: StatusUsuario[] = ['ativo', 'bloqueado'];

/** Recursos que o plano gratuito limita por mês. */
export type RecursoLimitado = 'orcamentos' | 'recibos';

export interface LimitesPlano {
  /** null = sem limite. */
  orcamentos: number | null;
  recibos: number | null;
}

/**
 * Cota mensal de cada plano. O gratuito para em 10 de cada; o Pro é aberto.
 * Fonte única: a landing, o aviso no app e o bloqueio da API leem daqui.
 */
export const LIMITES_POR_PLANO: Record<Plano, LimitesPlano> = {
  gratuito: { orcamentos: 10, recibos: 10 },
  pro: { orcamentos: null, recibos: null },
};

export const ROTULO_RECURSO: Record<RecursoLimitado, string> = {
  orcamentos: 'orçamentos',
  recibos: 'recibos',
};

export interface UsoMensal {
  orcamentos: number;
  recibos: number;
}

export interface ResumoPlano {
  plano: Plano;
  limites: LimitesPlano;
  uso: UsoMensal;
  /** Competência do uso, no formato AAAA-MM. */
  competencia: string;
}

export function ehPlano(valor: unknown): valor is Plano {
  return typeof valor === 'string' && PLANOS.includes(valor as Plano);
}

export function ehStatusUsuario(valor: unknown): valor is StatusUsuario {
  return typeof valor === 'string' && STATUS_USUARIO.includes(valor as StatusUsuario);
}
