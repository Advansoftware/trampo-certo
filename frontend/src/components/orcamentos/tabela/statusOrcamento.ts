import { OrcamentoStatus } from '@/types';

export interface StatusVisual {
  label: string;
  bg: string;
  color: string;
  dot: string;
}

/** Aparência de cada status — fonte única para dashboard e listagem. */
export const STATUS_VISUAL: Record<OrcamentoStatus, StatusVisual> = {
  aprovado: { label: 'Aprovado', bg: '#DBEAFE', color: '#172554', dot: '#1E3A8A' },
  recusado: { label: 'Recusado', bg: '#FEE2E2', color: '#991B1B', dot: '#DC2626' },
  pendente: { label: 'Pendente', bg: '#FEF3C7', color: '#92400E', dot: '#D97706' },
  rascunho: { label: 'Rascunho', bg: '#F1F4F9', color: '#43474E', dot: '#74777F' },
};

export function visualDoStatus(status: string): StatusVisual {
  return STATUS_VISUAL[status as OrcamentoStatus] ?? STATUS_VISUAL.pendente;
}

export type FiltroStatus = 'todos' | 'pendente' | 'aprovado' | 'recusado';

export const FILTROS_STATUS: Array<{ key: FiltroStatus; label: string }> = [
  { key: 'todos', label: 'Todos' },
  { key: 'pendente', label: 'Pendentes' },
  { key: 'aprovado', label: 'Aprovados' },
  { key: 'recusado', label: 'Recusados' },
];
