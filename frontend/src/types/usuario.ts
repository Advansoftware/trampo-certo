import { Plano, StatusUsuario } from './plano';

export interface PerfilMei {
  id: string;
  name: string;
  email: string;
  ocupacao: string;
  cnpj: string;
  telefone: string;
  cidade: string;
  chavePix: string;
  avatarInitials: string;
  image: string | null;
  plano: Plano;
  status: StatusUsuario;
  /** Conta definida no .env; só ela enxerga a área administrativa. */
  admin: boolean;
}
