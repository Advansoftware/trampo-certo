'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CabecalhoPaginaProps {
  etiqueta: string;
  iconeEtiqueta: React.ReactNode;
  /** Contagem ou situação exibida ao lado da etiqueta. */
  resumo?: string;
  corPonto?: string;
  titulo: string;
  descricao: React.ReactNode;
  acoes?: React.ReactNode;
}

/** Cabeçalho das telas de listagem: etiqueta, título, descrição e botões. */
export default function CabecalhoPagina({
  etiqueta,
  iconeEtiqueta,
  resumo,
  corPonto = '#1E3A8A',
  titulo,
  descricao,
  acoes,
}: CabecalhoPaginaProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2.5,
        mb: 4,
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, flexWrap: 'wrap' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.5,
              py: 0.4,
              borderRadius: '9999px',
              bgcolor: '#DBEAFE',
              color: '#172554',
              fontSize: '0.6875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {iconeEtiqueta}
            {etiqueta}
          </Box>

          {resumo && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                fontSize: '0.75rem',
                color: '#43474E',
                fontWeight: 500,
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  bgcolor: corPonto,
                  boxShadow: `0 0 0 2px ${corPonto}33`,
                }}
              />
              {resumo}
            </Box>
          )}
        </Box>

        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 800,
            color: '#1A1B20',
            fontSize: { xs: '1.5rem', md: '1.875rem' },
            letterSpacing: '-0.02em',
            mb: 0.5,
          }}
        >
          {titulo}
        </Typography>

        <Typography sx={{ color: '#43474E', fontSize: '0.875rem', maxWidth: 640, lineHeight: 1.5 }}>
          {descricao}
        </Typography>
      </Box>

      {acoes && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>{acoes}</Box>
      )}
    </Box>
  );
}
