'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface CardDestaqueProps {
  titulo: string;
  valor: string;
  sufixo?: string;
  icone: React.ReactNode;
  corIcone: string;
  fundoIcone: string;
  bordaIcone?: string;
  rodapeIcone: React.ReactNode;
  rodapeTexto: string;
  corRodape?: string;
}

/** Card de métrica do dashboard — mesmo layout para os quatro indicadores. */
export default function CardDestaque({
  titulo,
  valor,
  sufixo,
  icone,
  corIcone,
  fundoIcone,
  bordaIcone,
  rodapeIcone,
  rodapeTexto,
  corRodape = '#74777F',
}: CardDestaqueProps) {
  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(196, 198, 207, 0.5)',
        p: 3,
        borderRadius: '24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          sx={{
            fontSize: '0.6875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#74777F',
          }}
        >
          {titulo}
        </Typography>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: fundoIcone,
            color: corIcone,
            border: bordaIcone,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icone}
        </Box>
      </Box>

      <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: '#1A1B20', my: 1.5, letterSpacing: '-0.02em' }}>
        {valor}
        {sufixo && (
          <span style={{ fontSize: '1.25rem', color: '#43474E', fontWeight: 600 }}>{sufixo}</span>
        )}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: corRodape, fontSize: '0.75rem', fontWeight: 600 }}>
        {rodapeIcone}
        <span>{rodapeTexto}</span>
      </Box>
    </Box>
  );
}
