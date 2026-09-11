import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from './cliente.entity';
import { ClientePayload, parseCreateCliente, parseUpdateCliente } from './dto/cliente.dto';
import { ClientesRepository } from './clientes.repository';

@Injectable()
export class ClientesService {
  constructor(private readonly repository: ClientesRepository) {}

  findAll(userId: string): Promise<Cliente[]> {
    return this.repository.findAll(userId);
  }

  async findOne(userId: string, id: string): Promise<Cliente> {
    const cliente = await this.repository.findById(userId, id);
    if (!cliente) throw new NotFoundException('Cliente não encontrado.');
    return cliente;
  }

  async create(userId: string, body: Record<string, unknown>): Promise<Cliente> {
    const payload = parseCreateCliente(body);
    await this.assertDocumentoLivre(userId, payload);

    const id = await this.repository.create(userId, payload);
    return this.findOne(userId, id);
  }

  async update(userId: string, id: string, body: Record<string, unknown>): Promise<Cliente> {
    const updates = parseUpdateCliente(body);
    const changed = await this.repository.update(userId, id, updates);
    if (changed === 0) await this.findOne(userId, id); // dispara 404 se não existir
    return this.findOne(userId, id);
  }

  async remove(userId: string, id: string): Promise<void> {
    const removed = await this.repository.remove(userId, id);
    if (removed === 0) throw new NotFoundException('Cliente não encontrado.');
  }

  private async assertDocumentoLivre(userId: string, payload: ClientePayload): Promise<void> {
    if (!payload.documento) return;
    const existente = await this.repository.findByDocumento(userId, payload.documento);
    if (existente) {
      throw new ConflictException(`Já existe um cliente cadastrado com o documento ${payload.documento}.`);
    }
  }
}
