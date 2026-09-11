import { Injectable } from '@nestjs/common';
import { DatabaseService, SqlParam } from '../database/database.service';
import { PerfilMei } from './user.entity';

interface UserRow {
  id: string;
  name: string;
  email: string;
  ocupacao: string | null;
  cnpj: string | null;
  phone: string | null;
  cidade: string | null;
  chavePix: string | null;
  image: string | null;
}

export interface PerfilUpdates {
  name?: string;
  ocupacao?: string | null;
  cnpj?: string | null;
  phone?: string | null;
  cidade?: string | null;
  chavePix?: string | null;
}

@Injectable()
export class UsersRepository {
  constructor(private readonly db: DatabaseService) {}

  async findById(id: string): Promise<PerfilMei | null> {
    const row = await this.db.queryOne<UserRow>(
      'SELECT id, name, email, ocupacao, cnpj, phone, cidade, chavePix, image FROM user WHERE id = ?',
      [id],
    );
    return row ? toPerfil(row) : null;
  }

  async update(id: string, updates: PerfilUpdates): Promise<void> {
    const columns: string[] = [];
    const values: SqlParam[] = [];
    for (const [key, value] of Object.entries(updates)) {
      columns.push(`${key} = ?`);
      values.push(value as SqlParam);
    }
    if (columns.length === 0) return;

    await this.db.mutate(`UPDATE user SET ${columns.join(', ')} WHERE id = ?`, [...values, id]);
  }
}

function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '';
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return `${partes[0][0]}${partes[partes.length - 1][0]}`.toUpperCase();
}

function toPerfil(row: UserRow): PerfilMei {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    ocupacao: row.ocupacao || '',
    cnpj: row.cnpj || '',
    telefone: row.phone || '',
    cidade: row.cidade || '',
    chavePix: row.chavePix || '',
    avatarInitials: iniciais(row.name),
    image: row.image,
  };
}
