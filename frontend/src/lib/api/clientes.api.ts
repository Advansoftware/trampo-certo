import { Cliente, ClienteInput } from '@/types';
import { http } from './http';

export const clientesApi = {
  listar: () => http.get<Cliente[]>('/api/clientes'),
  buscar: (id: string) => http.get<Cliente>(`/api/clientes/${id}`),
  criar: (input: ClienteInput) => http.post<Cliente>('/api/clientes', input),
  atualizar: (id: string, input: Partial<ClienteInput>) => http.patch<Cliente>(`/api/clientes/${id}`, input),
  remover: (id: string) => http.delete(`/api/clientes/${id}`),
};
