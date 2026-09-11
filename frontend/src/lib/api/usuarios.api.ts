import { PerfilMei } from '@/types';
import { http } from './http';

export const usuariosApi = {
  perfil: () => http.get<PerfilMei>('/api/users/me'),
  atualizarPerfil: (input: Partial<PerfilMei>) => http.patch<PerfilMei>('/api/users/me', input),
};
