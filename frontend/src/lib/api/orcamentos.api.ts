import { Orcamento, OrcamentoInput, OrcamentoStatus } from '@/types';
import { http } from './http';

export const orcamentosApi = {
  listar: () => http.get<Orcamento[]>('/api/orcamentos'),
  buscar: (id: string) => http.get<Orcamento>(`/api/orcamentos/${id}`),
  criar: (input: OrcamentoInput) => http.post<Orcamento>('/api/orcamentos', input),
  atualizar: (id: string, input: OrcamentoInput) => http.patch<Orcamento>(`/api/orcamentos/${id}`, input),
  alterarStatus: (id: string, status: OrcamentoStatus) =>
    http.patch<Orcamento>(`/api/orcamentos/${id}/status`, { status }),
  remover: (id: string) => http.delete(`/api/orcamentos/${id}`),
};
