const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export function nomeDoMes(mesIndex: number): string {
  return MESES[mesIndex] ?? '';
}

/** 'YYYY-MM' da data informada. */
export function competenciaOf(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

/** 'MM/YYYY' — formato exibido no relatório mensal. */
export function competenciaBr(competencia: string): string {
  const [ano, mes] = competencia.split('-');
  return `${mes}/${ano}`;
}

/** 'Setembro/2026' */
export function competenciaExtenso(competencia: string): string {
  const [ano, mes] = competencia.split('-');
  return `${nomeDoMes(Number(mes) - 1)}/${ano}`;
}

export function toDateOnly(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

export function formatBrDate(value: Date | string | null | undefined): string | null {
  const iso = toDateOnly(value);
  if (!iso) return null;
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

/** Vencimento do DAS: dia configurado do mês seguinte à competência. */
export function vencimentoDas(competencia: string, dia: number): string {
  const [ano, mes] = competencia.split('-').map(Number);
  const vencimento = new Date(Date.UTC(ano, mes, Math.min(dia, 28)));
  return formatBrDate(vencimento) as string;
}

/** Converte 'YYYY-MM-DDTHH:mm' ou Date para o formato DATETIME do MySQL. */
export function toMysqlDateTime(value: Date | string | null | undefined): string {
  const date = value ? (value instanceof Date ? value : new Date(value)) : new Date();
  const safe = Number.isNaN(date.getTime()) ? new Date() : date;
  return safe.toISOString().slice(0, 19).replace('T', ' ');
}
