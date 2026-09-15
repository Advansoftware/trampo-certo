'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** Números de exemplo usados nas vitrines de landing e login. O app real lê da API. */
export const DEMO_TETO_MEI = 81000;
export const DEMO_FATURADO = 52450;

const formatarReal = (valor: number) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

interface TermometroTetoDemoProps {
  faturado?: number;
  teto?: number;
  compacto?: boolean;
}

/**
 * Prévia estática do termômetro do teto MEI.
 * Usada fora da área logada, onde ainda não existe sessão para consultar valores reais.
 */
export default function TermometroTetoDemo({
  faturado = DEMO_FATURADO,
  teto = DEMO_TETO_MEI,
  compacto = false,
}: TermometroTetoDemoProps) {
  const disponivel = teto - faturado;
  const percentual = (faturado / teto) * 100;
  const percentualTexto = `${percentual.toFixed(1).replace('.', ',')}% usado`;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10B981' }} />
          <Typography sx={{ fontWeight: 700, color: '#002045', fontSize: compacto ? '0.875rem' : '0.95rem' }}>
            Termômetro do teto {new Date().getFullYear()}
          </Typography>
        </Box>

        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: '9999px',
            bgcolor: '#E6F4EA',
            color: '#137333',
            fontSize: compacto ? '0.6875rem' : '0.75rem',
            fontWeight: 700,
          }}
        >
          Folga tranquila
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1.5 }}>
        <Box>
          <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>Faturado no ano</Typography>
          <Typography sx={{ fontSize: compacto ? '1.25rem' : '1.5rem', fontWeight: 800, color: '#002045' }}>
            {formatarReal(faturado)}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'right' }}>
          <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>Ainda cabe</Typography>
          <Typography sx={{ fontSize: compacto ? '0.875rem' : '1rem', fontWeight: 700, color: '#137333' }}>
            {formatarReal(disponivel)}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          bgcolor: '#EDEDF4',
          borderRadius: '9999px',
          height: compacto ? 10 : 12,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: '100%',
            bgcolor: '#002045',
            borderRadius: '9999px',
            width: `${percentual}%`,
            transition: 'width 1s ease-in-out',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 1,
          fontSize: compacto ? '0.6875rem' : '0.75rem',
          color: '#74777F',
        }}
      >
        <span>R$ 0</span>
        <Box component="span" sx={{ color: '#002045', fontWeight: 700 }}>
          {percentualTexto}
        </Box>
        <span>Teto: {formatarReal(teto)}</span>
      </Box>
    </Box>
  );
}
