export type Plano = 'gratuito' | 'pro';
export type StatusUsuario = 'ativo' | 'bloqueado';

export interface LimitesPlano {
  /** null = sem limite. */
  orcamentos: number | null;
  recibos: number | null;
}

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

/** Usuário listado na área administrativa. */
export interface UsuarioAdmin {
  id: string;
  name: string;
  email: string;
  ocupacao: string;
  cidade: string;
  cnpj: string;
  plano: Plano;
  status: StatusUsuario;
  admin: boolean;
  criadoEm: string;
  totalOrcamentos: number;
  totalRecibos: number;
  totalClientes: number;
}

export const ROTULO_PLANO: Record<Plano, string> = {
  gratuito: 'Gratuito',
  pro: 'Pro',
};
