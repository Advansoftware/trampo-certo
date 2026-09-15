import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { ClientesRepository } from '../clientes/clientes.repository';
import { OrcamentosRepository } from '../orcamentos/orcamentos.repository';
import { PlanosService } from '../planos/planos.service';
import { valorPorExtenso } from '../common/utils/extenso.util';
import { Recibo } from './recibo.entity';
import { parseCreateRecibo, ReciboPayload } from './dto/recibo.dto';
import { RecibosRepository } from './recibos.repository';

@Injectable()
export class RecibosService {
  constructor(
    private readonly repository: RecibosRepository,
    private readonly clientesRepository: ClientesRepository,
    private readonly orcamentosRepository: OrcamentosRepository,
    private readonly planosService: PlanosService,
  ) {}

  findAll(userId: string): Promise<Recibo[]> {
    return this.repository.findAll(userId);
  }

  async findOne(userId: string, id: string): Promise<Recibo> {
    const recibo = await this.repository.findById(userId, id);
    if (!recibo) throw new NotFoundException('Recibo não encontrado.');
    return recibo;
  }

  async create(userId: string, body: Record<string, unknown>): Promise<Recibo> {
    await this.planosService.assertPodeCriar(userId, 'recibos');

    const payload = parseCreateRecibo(body);
    const orcamento = await this.carregarOrcamento(userId, payload);

    const id = await this.repository.create(userId, {
      ...payload,
      clienteId: orcamento?.clienteId ?? (await this.resolverCliente(userId, payload)),
      propostaCodigo: orcamento?.codigo ?? null,
      valorExtenso: valorPorExtenso(payload.valor),
      autenticacao: gerarAutenticacao(payload.formaPagamento),
    });

    return this.findOne(userId, id);
  }

  async remove(userId: string, id: string): Promise<void> {
    const removed = await this.repository.remove(userId, id);
    if (removed === 0) throw new NotFoundException('Recibo não encontrado.');
  }

  private async carregarOrcamento(userId: string, payload: ReciboPayload) {
    if (!payload.orcamentoId) return null;
    const orcamento = await this.orcamentosRepository.findById(userId, payload.orcamentoId);
    if (!orcamento) throw new NotFoundException('Orçamento informado não pertence a esta conta.');
    return orcamento;
  }

  /** Vincula o recibo à carteira de clientes para alimentar os agregados. */
  private async resolverCliente(userId: string, payload: ReciboPayload): Promise<string | null> {
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
      email: null,
      cidade: null,
      bairro: null,
      observacoes: null,
      status: 'ativo',
      tags: [],
    });
  }
}

/** Código de autenticação do recibo: TC-PIX-8F4A19C02B. */
function gerarAutenticacao(formaPagamento: string): string {
  const prefixo = formaPagamento === 'transferencia' ? 'TED' : formaPagamento.slice(0, 4).toUpperCase();
  return `TC-${prefixo}-${randomBytes(6).toString('hex').toUpperCase()}`;
}
