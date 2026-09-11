/** Perfil MEI exibido no app (cabeçalho, recibos, proposta A4). */
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
}
