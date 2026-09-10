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

export default function DashboardHeader({ userName = 'Rodrigo' }: DashboardHeaderProps) {
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: '9999px',
              bgcolor: '#DBEAFE',
              color: '#172554',
              fontSize: '0.6875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Painel Financeiro MEI
          </Box>
          <Typography
            component="div"
            sx={{
              fontSize: '0.8125rem',
              color: '#43474E',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: '#1E3A8A',
                display: 'inline-block',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(0.9)', opacity: 0.8 },
                  '50%': { transform: 'scale(1.2)', opacity: 1 },
                  '100%': { transform: 'scale(0.9)', opacity: 0.8 },
                },
              }}
            />
            Sincronizado com Simples Nacional
          </Typography>
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
          Olá, {userName}! 👋
        </Typography>

        <Typography sx={{ fontSize: '0.9rem', color: '#43474E', mt: 0.5 }}>
          Veja a saúde do seu MEI e o andamento dos seus trampos neste mês.
        </Typography>
      </Box>

      {/* Quick Action Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <AppButton
          variant="outlined"
          size="medium"
          startIcon={<ReceiptLongIcon sx={{ fontSize: 20, color: '#1E3A8A' }} />}
          onClick={() => router.push('/orcamentos/novo')}
        >
          Emitir Recibo
        </AppButton>

        <AppButton
          variant="primary"
          size="medium"
          startIcon={<AddCircleIcon sx={{ fontSize: 20 }} />}
          onClick={() => router.push('/orcamentos/novo')}
        >
          Criar Orçamento Rápido
        </AppButton>
      </Box>
    </Box>
  );
}
