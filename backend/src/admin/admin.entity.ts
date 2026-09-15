import { Plano, StatusUsuario } from '../planos/plano.entity';

/** Linha da listagem administrativa de usuários. */
export interface UsuarioAdmin {
  id: string;
  name: string;
  email: string;
  ocupacao: string;
  cidade: string;
  cnpj: string;
  plano: Plano;
  status: StatusUsuario;
  /** true para a conta definida no .env, que não pode ser alterada. */
  admin: boolean;
  criadoEm: string;
  totalOrcamentos: number;
  totalRecibos: number;
  totalClientes: number;
}
