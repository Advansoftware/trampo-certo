import { ResumoPlano } from '@/types';
import { http } from './http';

export const planosApi = {
  meu: () => http.get<ResumoPlano>('/api/planos/me'),
};
