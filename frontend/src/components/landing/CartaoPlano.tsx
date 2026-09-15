'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

interface CartaoPlanoProps {
  etiqueta: string;
  nome: string;
  preco: string;
  itens: string[];
  acaoLabel: string;
  onAcao: () => void;
  /** Versão escura, usada no plano pago. */
  destaque?: boolean;
  selo?: string;
}

const paleta = {
  claro: {
    fundo: '#FFFFFF',
    texto: '#002045',
    textoEtiqueta: '#74777F',
    textoItem: '#43474E',
    corIcone: '#137333',
    textoPeriodo: '#74777F',
  },
  escuro: {
    fundo: '#002045',
    texto: '#FFFFFF',
    textoEtiqueta: '#FFDBCF',
    textoItem: 'rgba(255, 255, 255, 0.9)',
    corIcone: '#FFDBCF',
    textoPeriodo: 'rgba(255, 255, 255, 0.7)',
  },
} as const;

/** Cartão de plano da seção de preços. */
export default function CartaoPlano({
  etiqueta,
  nome,
  preco,
  itens,
  acaoLabel,
  onAcao,
  destaque = false,
  selo,
}: CartaoPlanoProps) {
  const cores = destaque ? paleta.escuro : paleta.claro;

  return (
    <Box
      sx={{
        height: '100%',
        bgcolor: cores.fundo,
        color: cores.texto,
        borderRadius: '24px',
        p: { xs: 3.5, sm: 4.5 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: destaque ? 'none' : '1px solid rgba(226, 226, 233, 0.8)',
        boxShadow: destaque ? '0 12px 36px rgba(0, 32, 69, 0.25)' : 'none',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography sx={{ color: cores.textoEtiqueta, fontSize: '0.875rem', fontWeight: 600 }}>
            {etiqueta}
          </Typography>

          {selo && (
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: '9999px',
                bgcolor: '#A23E18',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              {selo}
            </Box>
          )}
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 800, color: cores.texto, mb: 0.5 }}>
          {nome}
        </Typography>

        <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: cores.texto, mb: 3 }}>
          {preco}{' '}
          <Box component="span" sx={{ fontSize: '0.9rem', fontWeight: 500, color: cores.textoPeriodo }}>
            /mês
          </Box>
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, mb: 4 }}>
          {itens.map((item) => (
            <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CheckIcon sx={{ color: cores.corIcone, fontSize: 20, flexShrink: 0 }} />
              <Typography sx={{ color: cores.textoItem, fontSize: '0.9rem' }}>{item}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Button
        onClick={onAcao}
        variant={destaque ? 'contained' : 'outlined'}
        fullWidth
        sx={{
          py: 1.5,
          borderRadius: '9999px',
          fontWeight: 700,
          textTransform: 'none',
          fontSize: '0.95rem',
          ...(destaque
            ? { bgcolor: '#FFFFFF', color: '#002045', '&:hover': { bgcolor: '#F3F3FA' } }
            : {
                borderColor: '#C4C6CF',
                color: '#002045',
                '&:hover': { borderColor: '#002045', bgcolor: 'rgba(0, 32, 69, 0.04)' },
              }),
        }}
      >
        {acaoLabel}
      </Button>
    </Box>
  );
}
