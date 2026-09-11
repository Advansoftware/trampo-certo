function toDate(valor: string | Date | null | undefined): Date | null {
  if (!valor) return null;
  const data = valor instanceof Date ? valor : new Date(valor);
  return Number.isNaN(data.getTime()) ? null : data;
}

/** ISO -> "10/09/2026" */
export function formatData(valor: string | Date | null | undefined): string {
  const data = toDate(valor);
  return data ? data.toLocaleDateString('pt-BR') : '';
}

/** ISO -> "10/09/2026 às 11:30" — usado no corpo do recibo. */
export function formatDataHora(valor: string | Date | null | undefined): string {
  const data = toDate(valor);
  if (!data) return '';
  const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${data.toLocaleDateString('pt-BR')} às ${hora}`;
}

/**
 * ISO -> "Hoje, 10:42" / "Ontem, 16:15" / "05/09/2026".
 * Rótulo relativo das listagens; o backend devolve sempre ISO.
 */
export function formatDataEnvio(valor: string | Date | null | undefined): string {
  const data = toDate(valor);
  if (!data) return '';

  const hoje = new Date();
  const mesmoDia = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const ontem = new Date(hoje);
  ontem.setDate(hoje.getDate() - 1);

  const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  if (mesmoDia(data, hoje)) return `Hoje, ${hora}`;
  if (mesmoDia(data, ontem)) return `Ontem, ${hora}`;
  return data.toLocaleDateString('pt-BR');
}

/** "2026-09" -> "Setembro/2026" */
export function formatCompetencia(competencia: string): string {
  const [ano, mes] = (competencia || '').split('-');
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];
  const indice = Number(mes) - 1;
  return meses[indice] ? `${meses[indice]}/${ano}` : competencia;
}
