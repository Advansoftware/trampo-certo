import { BadRequestException } from '@nestjs/common';
import { toNumber } from './number.util';

export function requiredString(value: unknown, campo: string, maxLength = 255): string {
  const texto = typeof value === 'string' ? value.trim() : '';
  if (!texto) throw new BadRequestException(`O campo "${campo}" é obrigatório.`);
  if (texto.length > maxLength) {
    throw new BadRequestException(`O campo "${campo}" excede ${maxLength} caracteres.`);
  }
  return texto;
}

export function optionalString(value: unknown, maxLength = 255): string | null {
  const texto = typeof value === 'string' ? value.trim() : '';
  if (!texto) return null;
  return texto.slice(0, maxLength);
}

export function optionalText(value: unknown): string | null {
  const texto = typeof value === 'string' ? value.trim() : '';
  return texto || null;
}

export function positiveNumber(value: unknown, campo: string): number {
  const numero = toNumber(value, NaN);
  if (!Number.isFinite(numero) || numero < 0) {
    throw new BadRequestException(`O campo "${campo}" deve ser um número válido.`);
  }
  return numero;
}

export function enumValue<T extends string>(value: unknown, permitidos: readonly T[], campo: string, fallback?: T): T {
  const texto = typeof value === 'string' ? value.trim().toLowerCase() : '';
  const encontrado = permitidos.find((item) => item.toLowerCase() === texto);
  if (encontrado) return encontrado;
  if (fallback !== undefined) return fallback;
  throw new BadRequestException(`O campo "${campo}" deve ser um de: ${permitidos.join(', ')}.`);
}

export function stringArray(value: unknown, maxItems = 20): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);
}
