'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineOutlined';
import AppButton from './AppButton';

interface EstadoCarregamentoProps {
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  children: React.ReactNode;
  /** Altura mínima do bloco enquanto carrega, para evitar salto de layout. */
  minHeight?: number;
}

/**
 * Envolve blocos que dependem da API: spinner enquanto carrega, mensagem com
 * "tentar de novo" quando falha, conteúdo real quando os dados chegam.
 */
export default function EstadoCarregamento({
  loading,
  error,
  onRetry,
  children,
  minHeight = 160,
}: EstadoCarregamentoProps) {
  if (loading) {
    return (
      <Box
        sx={{
          minHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#FFFFFF',
          border: '1px solid rgba(196, 198, 207, 0.4)',
          borderRadius: '20px',
        }}
      >
        <CircularProgress size={28} sx={{ color: '#1E3A8A' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          p: 3,
          bgcolor: '#FEF2F2',
          border: '1px solid #FECACA',
          borderRadius: '20px',
          textAlign: 'center',
        }}
      >
        <ErrorOutlineIcon sx={{ color: '#DC2626', fontSize: 30 }} />
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#991B1B' }}>
          {error}
        </Typography>
        {onRetry && (
          <AppButton variant="outlined" size="small" onClick={onRetry}>
            Tentar novamente
          </AppButton>
        )}
      </Box>
    );
  }

  return <>{children}</>;
}
