import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { optionalString, requiredString } from '../common/utils/validation.util';
import { PerfilMei } from './user.entity';
import { PerfilUpdates, UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async findMe(userId: string): Promise<PerfilMei> {
    const perfil = await this.repository.findById(userId);
    if (!perfil) throw new NotFoundException('Perfil não encontrado.');
    return perfil;
  }

  async updateMe(userId: string, body: Record<string, unknown>): Promise<PerfilMei> {
    const updates: PerfilUpdates = {};

    if ('name' in body) updates.name = requiredString(body.name, 'name');
    if ('ocupacao' in body) updates.ocupacao = optionalString(body.ocupacao);
    if ('cnpj' in body) updates.cnpj = optionalString(body.cnpj, 20);
    if ('telefone' in body) updates.phone = optionalString(body.telefone, 30);
    if ('cidade' in body) updates.cidade = optionalString(body.cidade, 120);
    if ('chavePix' in body) updates.chavePix = optionalString(body.chavePix);

    if (Object.keys(updates).length === 0) {
      throw new BadRequestException('Nenhum campo válido foi enviado para atualização.');
    }

    await this.repository.update(userId, updates);
    return this.findMe(userId);
  }
}
