import { Recibo, ReciboInput } from '@/types';
import { http } from './http';

export const recibosApi = {
  listar: () => http.get<Recibo[]>('/api/recibos'),
  buscar: (id: string) => http.get<Recibo>(`/api/recibos/${id}`),
  criar: (input: ReciboInput) => http.post<Recibo>('/api/recibos', input),
  remover: (id: string) => http.delete(`/api/recibos/${id}`),
};
