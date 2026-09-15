'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface SeloMetrica {
  texto: string;
  bgcolor: string;
  color: string;
}

interface CartaoMetricaProps {
  titulo: string;
  valor: string;
  detalhe?: string;
  icone: React.ReactNode;
  corIcone: string;
  fundoIcone: string;
  /** Só use quando o texto vier dos dados; selo decorativo mente para o usuário. */
  selo?: SeloMetrica;
}

/** Cartão de indicador usado nas listagens de clientes, recibos e faturamento. */
export default function CartaoMetrica({
  titulo,
  valor,
  detalhe,
  icone,
  corIcone,
  fundoIcone,
  selo,
}: CartaoMetricaProps) {
  return (
    <Box
      sx={{
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(196, 198, 207, 0.4)',
        borderRadius: '20px',
        p: 2.5,
        boxShadow: '0 1px 4px rgba(30, 41, 59, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'rgba(30, 58, 138, 0.25)',
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(30, 41, 59, 0.06)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '14px',
            bgcolor: fundoIcone,
            color: corIcone,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icone}
        </Box>

        {selo && (
          <Box
            sx={{
              px: 1.25,
              py: 0.25,
              borderRadius: '9999px',
              bgcolor: selo.bgcolor,
              color: selo.color,
              fontSize: '0.6875rem',
              fontWeight: 700,
            }}
          >
            {selo.texto}
          </Box>
        )}
      </Box>

      <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#74777F' }}>{titulo}</Typography>

      <Typography
        sx={{
          fontSize: { xs: '1.35rem', sm: '1.6rem' },
          fontWeight: 800,
          color: '#1A1B20',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          mt: 0.25,
        }}
      >
        {valor}
      </Typography>

      {detalhe && (
        <Typography
          sx={{
            fontSize: '0.75rem',
            color: '#74777F',
            mt: 1,
            pt: 1,
            borderTop: '1px solid rgba(196, 198, 207, 0.25)',
          }}
        >
          {detalhe}
        </Typography>
      )}
    </Box>
  );
}
