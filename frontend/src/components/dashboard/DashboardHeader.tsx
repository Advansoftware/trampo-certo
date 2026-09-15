'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AppButton from '@/components/common/AppButton';

interface DashboardHeaderProps {
  userName?: string;
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2,
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'inline-block',
            px: 1.5,
            py: 0.5,
            mb: 1,
            borderRadius: '9999px',
            bgcolor: '#DBEAFE',
            color: '#172554',
            fontSize: '0.6875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Painel do MEI
        </Box>

        <Typography
          component="h1"
          sx={{
            fontWeight: 800,
            color: '#1A1B20',
            fontSize: { xs: '1.75rem', sm: '2.2rem' },
            letterSpacing: '-0.02em',
          }}
        >
          {userName ? `Olá, ${userName}!` : 'Olá!'}
        </Typography>

        <Typography sx={{ fontSize: '0.9rem', color: '#43474E', mt: 0.5 }}>
          Como está o seu mês até agora.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <AppButton
          variant="outlined"
          size="medium"
          startIcon={<ReceiptLongIcon sx={{ fontSize: 20, color: '#1E3A8A' }} />}
          onClick={() => router.push('/recibos')}
        >
          Emitir recibo
        </AppButton>

        <AppButton
          variant="primary"
          size="medium"
          startIcon={<AddCircleIcon sx={{ fontSize: 20 }} />}
          onClick={() => router.push('/orcamentos/novo')}
        >
          Novo orçamento
        </AppButton>
      </Box>
    </Box>
  );
}
