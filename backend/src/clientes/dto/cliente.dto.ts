import { BadRequestException } from '@nestjs/common';
import {
  enumValue,
  optionalString,
  optionalText,
  requiredString,
  stringArray,
} from '../../common/utils/validation.util';
import { ClienteStatus, ClienteTipo } from '../cliente.entity';

const TIPOS: readonly ClienteTipo[] = ['PF', 'PJ'];
const STATUS: readonly ClienteStatus[] = ['ativo', 'inativo'];

export interface ClientePayload {
  nome: string;
  tipo: ClienteTipo;
  documento: string | null;
  telefone: string | null;
  email: string | null;
  cidade: string | null;
  bairro: string | null;
  observacoes: string | null;
  status: ClienteStatus;
  tags: string[];
}

export function parseCreateCliente(body: Record<string, unknown>): ClientePayload {
  return {
    nome: requiredString(body.nome, 'nome'),
    tipo: (enumValue(body.tipo, TIPOS.map((t) => t.toLowerCase()) as string[], 'tipo', 'pf').toUpperCase() as ClienteTipo),
    documento: optionalString(body.documento, 30),
    telefone: optionalString(body.telefone, 30),
    email: optionalString(body.email, 255),
    cidade: optionalString(body.cidade, 120),
    bairro: optionalString(body.bairro, 120),
    observacoes: optionalText(body.observacoes),
    status: enumValue(body.status, STATUS, 'status', 'ativo'),
    tags: stringArray(body.tags),
  };
}

/** PATCH: só os campos presentes no corpo são alterados. */
export function parseUpdateCliente(body: Record<string, unknown>): Partial<ClientePayload> {
  const updates: Partial<ClientePayload> = {};

  if ('nome' in body) updates.nome = requiredString(body.nome, 'nome');
  if ('tipo' in body) {
    updates.tipo = enumValue(body.tipo, TIPOS.map((t) => t.toLowerCase()) as string[], 'tipo').toUpperCase() as ClienteTipo;
  }
  if ('documento' in body) updates.documento = optionalString(body.documento, 30);
  if ('telefone' in body) updates.telefone = optionalString(body.telefone, 30);
  if ('email' in body) updates.email = optionalString(body.email, 255);
  if ('cidade' in body) updates.cidade = optionalString(body.cidade, 120);
  if ('bairro' in body) updates.bairro = optionalString(body.bairro, 120);
  if ('observacoes' in body) updates.observacoes = optionalText(body.observacoes);
  if ('status' in body) updates.status = enumValue(body.status, STATUS, 'status');
  if ('tags' in body) updates.tags = stringArray(body.tags);

  if (Object.keys(updates).length === 0) {
    throw new BadRequestException('Nenhum campo válido foi enviado para atualização.');
  }
  return updates;
}
