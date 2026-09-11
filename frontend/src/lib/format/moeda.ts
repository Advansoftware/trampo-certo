/** 1450 -> "1.450,00" */
export function formatNumero(valor: number): string {
  return (Number(valor) || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** 1450 -> "R$ 1.450,00" */
export function formatMoeda(valor: number): string {
  return `R$ ${formatNumero(valor)}`;
}

/** 1450 -> "R$ 1.450" (cards e gauges, sem centavos) */
export function formatMoedaCompacta(valor: number): string {
  return `R$ ${Math.round(Number(valor) || 0).toLocaleString('pt-BR')}`;
}

/** Aceita "R$ 1.450,00", "1450.00" ou número e devolve number. */
export function parseValor(entrada: unknown): number {
  if (typeof entrada === 'number') return Number.isFinite(entrada) ? entrada : 0;
  if (typeof entrada !== 'string') return 0;

  const normalizado = entrada
    .replace(/[^\d,.-]/g, '')
    .replace(/\.(?=\d{3}(\D|$))/g, '')
    .replace(',', '.');
  const numero = Number.parseFloat(normalizado);
  return Number.isFinite(numero) ? numero : 0;
}

export function formatPercentual(valor: number, casas = 0): string {
  return `${(Number(valor) || 0).toFixed(casas)}%`;
}
