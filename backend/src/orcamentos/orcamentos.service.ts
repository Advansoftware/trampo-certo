import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ClientesRepository } from '../clientes/clientes.repository';
import { PlanosService } from '../planos/planos.service';
import { Orcamento, OrcamentoStatus, STATUS_BLOQUEADOS } from './orcamento.entity';
import { OrcamentoPayload, parseCreateOrcamento, parseStatus, parseUpdateOrcamento } from './dto/orcamento.dto';
import { OrcamentosRepository } from './orcamentos.repository';

const MOTIVO_BLOQUEIO: Record<string, string> = {
  aprovado: 'Este orçamento já foi aprovado e está protegido contra alterações.',
  recusado: 'Este orçamento foi recusado e não aceita mais alterações.',
};

@Injectable()
export class OrcamentosService {
  constructor(
    private readonly repository: OrcamentosRepository,
    private readonly clientesRepository: ClientesRepository,
    private readonly planosService: PlanosService,
  ) {}

  findAll(userId: string): Promise<Orcamento[]> {
    return this.repository.findAll(userId);
  }

  async findOne(userId: string, id: string): Promise<Orcamento> {
    const orcamento = await this.repository.findById(userId, id);
    if (!orcamento) throw new NotFoundException('Orçamento não encontrado.');
    return orcamento;
  }

  async create(userId: string, body: Record<string, unknown>): Promise<Orcamento> {
    await this.planosService.assertPodeCriar(userId, 'orcamentos');

    const payload = parseCreateOrcamento(body);
    payload.clienteId = await this.resolverCliente(userId, payload);

    const id = await this.repository.create(userId, payload);
    return this.findOne(userId, id);
  }

  async update(userId: string, id: string, body: Record<string, unknown>): Promise<Orcamento> {
    const atual = await this.findOne(userId, id);
    this.assertEditavel(atual);

    const payload = parseUpdateOrcamento(body);
    payload.clienteId = await this.resolverCliente(userId, payload);

    const changed = await this.repository.update(userId, id, payload);
    if (changed === 0) throw new NotFoundException('Orçamento não encontrado.');
    return this.findOne(userId, id);
  }

  async updateStatus(userId: string, id: string, body: Record<string, unknown>): Promise<Orcamento> {
    const status = parseStatus(body);
    await this.findOne(userId, id);

    const changed = await this.repository.updateStatus(userId, id, status);
    if (changed === 0) throw new NotFoundException('Orçamento não encontrado.');
    return this.findOne(userId, id);
  }

  async remove(userId: string, id: string): Promise<void> {
    const atual = await this.findOne(userId, id);
    this.assertEditavel(atual);

    const removed = await this.repository.remove(userId, id);
    if (removed === 0) throw new NotFoundException('Orçamento não encontrado.');
  }

  private assertEditavel(orcamento: Orcamento): void {
    if (STATUS_BLOQUEADOS.includes(orcamento.status)) {
      throw new ConflictException(MOTIVO_BLOQUEIO[orcamento.status]);
    }
  }

  /**
   * Todo orçamento aponta para um cliente da carteira: o id enviado é validado,
   * e quando ele não vem o cliente é localizado pelo documento ou criado na hora.
   * É o que mantém os agregados da tela de Clientes coerentes.
   */
  private async resolverCliente(userId: string, payload: OrcamentoPayload): Promise<string | null> {
    if (payload.clienteId) {
      const existente = await this.clientesRepository.findById(userId, payload.clienteId);
      if (!existente) throw new NotFoundException('Cliente informado não pertence a esta conta.');
      return existente.id;
    }

    if (payload.clienteDocumento) {
      const porDocumento = await this.clientesRepository.findByDocumento(userId, payload.clienteDocumento);
      if (porDocumento) return porDocumento.id;
    }

    return this.clientesRepository.create(userId, {
      nome: payload.clienteNome,
      tipo: 'PF',
      documento: payload.clienteDocumento,
      telefone: payload.clienteTelefone,
      email: payload.clienteEmail,
      cidade: payload.clienteLocalizacao,
      bairro: null,
      observacoes: null,
      status: 'ativo',
      tags: [],
    });
  }
}
