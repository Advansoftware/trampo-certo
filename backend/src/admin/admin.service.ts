import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ehPlano, ehStatusUsuario } from '../planos/plano.entity';
import { UsuarioAdmin } from './admin.entity';
import { AdminRepository, UsuarioUpdates } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(private readonly repository: AdminRepository) {}

  findAll(): Promise<UsuarioAdmin[]> {
    return this.repository.findAll();
  }

  async update(id: string, body: Record<string, unknown>): Promise<UsuarioAdmin> {
    const alvo = await this.carregar(id);
    const updates: UsuarioUpdates = {};

    if ('plano' in body) {
      if (!ehPlano(body.plano)) throw new BadRequestException('Plano inválido.');
      updates.plano = body.plano;
    }

    if ('status' in body) {
      if (!ehStatusUsuario(body.status)) throw new BadRequestException('Status inválido.');
      // Bloquear o próprio administrador deixaria o app sem quem o desbloqueie.
      if (alvo.admin && body.status === 'bloqueado') {
        throw new ForbiddenException('A conta do administrador não pode ser bloqueada.');
      }
      updates.status = body.status;
    }

    if (Object.keys(updates).length === 0) {
      throw new BadRequestException('Envie plano ou status para atualizar.');
    }

    await this.repository.update(id, updates);
    return this.carregar(id);
  }

  async remove(id: string): Promise<void> {
    const alvo = await this.carregar(id);
    if (alvo.admin) {
      throw new ForbiddenException('A conta do administrador não pode ser excluída.');
    }

    const removidos = await this.repository.remove(id);
    if (removidos === 0) throw new NotFoundException('Usuário não encontrado.');
  }

  private async carregar(id: string): Promise<UsuarioAdmin> {
    const usuario = await this.repository.findById(id);
    if (!usuario) throw new NotFoundException('Usuário não encontrado.');
    return usuario;
  }
}
