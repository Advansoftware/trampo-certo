import type { CSSProperties } from 'react';

const BORDA = 'rgba(196, 198, 207, 0.6)';

/** Estilo base dos inputs nativos do editor (mantém o visual do Stitch). */
export function estiloInput(opcoes: {
  bloqueado?: boolean;
  alinhamento?: CSSProperties['textAlign'];
  padding?: string;
  fundo?: string;
  fonte?: string;
} = {}): CSSProperties {
  const { bloqueado = false, alinhamento, padding = '11px 16px', fundo = '#F1F4F9', fonte = '14px' } = opcoes;

  return {
    width: '100%',
    padding,
    backgroundColor: bloqueado ? '#F8F9FD' : fundo,
    border: `1px solid ${BORDA}`,
    borderRadius: '12px',
    fontSize: fonte,
    color: bloqueado ? '#64748B' : '#1A1B20',
    outline: 'none',
    cursor: bloqueado ? 'not-allowed' : 'text',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    textAlign: alinhamento,
    transition: 'border-color 0.15s ease, background-color 0.15s ease',
  };
}

/**
 * Realce de foco dos inputs nativos. Retorna handlers prontos para espalhar
 * no elemento — antes cada campo repetia o mesmo par de callbacks inline.
 */
export function focoInput(bloqueado = false, fundoNormal = '#F1F4F9') {
  return {
    onFocus: (evento: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (bloqueado) return;
      evento.currentTarget.style.backgroundColor = '#FFFFFF';
      evento.currentTarget.style.borderColor = '#1E3A8A';
    },
    onBlur: (evento: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (bloqueado) return;
      evento.currentTarget.style.backgroundColor = fundoNormal;
      evento.currentTarget.style.borderColor = BORDA;
    },
  };
}

export const ESTILO_ROTULO = {
  fontSize: '11px',
  color: '#43474E',
  textTransform: 'uppercase' as const,
  fontWeight: 600,
  letterSpacing: '0.05em',
};

export const ESTILO_CARD = {
  bgcolor: '#FFFFFF',
  borderRadius: '20px',
  p: 3,
  border: '1px solid rgba(196, 198, 207, 0.4)',
  boxShadow: '0 2px 12px rgba(30, 41, 59, 0.03)',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 2,
};
