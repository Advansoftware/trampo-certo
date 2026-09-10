'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Logo from '@/components/Logo';
import AppButton from '@/components/common/AppButton';

export default function ReferralNavbar() {
  const router = useRouter();

  return (
    <Box
      component="header"
      sx={{
        height: 76,
        bgcolor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(196, 198, 207, 0.4)',
        px: { xs: 2.5, sm: 4, lg: 8 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Brand + Invite Tag */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          onClick={() => router.push('/')}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <Logo height={34} />
        </Box>

        <Box
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            alignItems: 'center',
            gap: 0.75,
            px: 1.5,
            py: 0.4,
            borderRadius: '9999px',
            bgcolor: '#DCFCE7',
            color: '#166534',
            fontSize: '0.6875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          <CardGiftcardIcon sx={{ fontSize: 14 }} />
          Convite Exclusivo MEI
        </Box>
      </Box>

      {/* Login CTA */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography
          sx={{
            fontSize: '0.8125rem',
            color: '#74777F',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Já é cadastrado?
        </Typography>
        <AppButton
          variant="outlined"
          size="small"
          onClick={() => router.push('/login')}
        >
          Entrar na Conta
        </AppButton>
      </Box>
    </Box>
  );
}
