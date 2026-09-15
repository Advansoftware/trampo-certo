import { SeloMetrica } from '@/components/common/CartaoMetrica';

/** Portal oficial onde o MEI emite a guia DAS em PDF. */
export const URL_PGMEI =
  'https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/pgmei.app/';

/**
 * Como está o uso do teto anual, a partir do percentual já faturado.
 * Serve ao termômetro do painel e ao cartão da tela de faturamento, para que
 * os dois digam a mesma coisa sobre o mesmo número.
 */
export function situacaoDoTeto(percentual: number): SeloMetrica {
  if (percentual >= 80) return { texto: 'Perto do teto', bgcolor: '#FEE2E2', color: '#991B1B' };
  if (percentual >= 60) return { texto: 'Fique de olho', bgcolor: '#FEF3C7', color: '#92400E' };
  return { texto: 'Folga tranquila', bgcolor: '#E0E7FF', color: '#1E3A8A' };
}
