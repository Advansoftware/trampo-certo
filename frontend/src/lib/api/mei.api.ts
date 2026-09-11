import { DasCompetencia, DestaquesMensais, MeiConfig, MeiMetrics, ReceitaMensal } from '@/types';
import { http } from './http';

const anoQuery = (ano?: number) => (ano ? `?ano=${ano}` : '');

export const meiApi = {
  metricas: (ano?: number) => http.get<MeiMetrics>(`/api/mei/metrics${anoQuery(ano)}`),
  receitasMensais: (ano?: number) => http.get<ReceitaMensal[]>(`/api/mei/receitas-mensais${anoQuery(ano)}`),
  destaques: () => http.get<DestaquesMensais>('/api/mei/destaques'),
  config: () => http.get<MeiConfig>('/api/mei/config'),
  atualizarConfig: (input: Partial<MeiConfig>) => http.patch<MeiConfig>('/api/mei/config', input),
  pagarDas: (competencia: string) => http.post<DasCompetencia>(`/api/mei/das/${competencia}/pagar`),
};
