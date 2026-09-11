'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import AppButton from './AppButton';

interface EstadoVazioProps {
  titulo: string;
  descricao?: string;
  acaoLabel?: string;
  onAcao?: () => void;
  icone?: React.ReactNode;
}

/** Estado vazio das listagens — conta nova começa sem nenhum registro. */
export default function EstadoVazio({ titulo, descricao, acaoLabel, onAcao, icone }: EstadoVazioProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.25,
        py: 6,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: '16px',
          bgcolor: '#F1F4F9',
          color: '#74777F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icone || <InboxOutlinedIcon sx={{ fontSize: 26 }} />}
      </Box>
      <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#1A1B20' }}>{titulo}</Typography>
      {descricao && (
        <Typography sx={{ fontSize: '0.8125rem', color: '#74777F', maxWidth: 420 }}>{descricao}</Typography>
      )}
      {acaoLabel && onAcao && (
        <AppButton size="small" onClick={onAcao} sx={{ mt: 1 }}>
          {acaoLabel}
        </AppButton>
      )}
    </Box>
  );
}
