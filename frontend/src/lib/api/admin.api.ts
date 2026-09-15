import { Plano, StatusUsuario, UsuarioAdmin } from '@/types';
import { http } from './http';

export interface AtualizacaoUsuario {
  plano?: Plano;
  status?: StatusUsuario;
}

export const adminApi = {
  usuarios: () => http.get<UsuarioAdmin[]>('/api/admin/users'),
  atualizar: (id: string, input: AtualizacaoUsuario) =>
    http.patch<UsuarioAdmin>(`/api/admin/users/${id}`, input),
  excluir: (id: string) => http.delete<void>(`/api/admin/users/${id}`),
};
