'use client';

import React from 'react';
import Box from '@mui/material/Box';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import Logo from '@/components/Logo';

export default function LoginHeader() {
  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1100,
        bgcolor: 'rgba(249, 249, 255, 0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.04)',
      }}
    >
      <Box
        sx={{
          height: 68,
          maxWidth: 1360,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Logo height={42} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              color: 'text.secondary',
              fontSize: '0.8125rem',
              fontWeight: 600,
            }}
          >
            <VerifiedUserOutlinedIcon sx={{ fontSize: 18, color: '#74777F' }} />
            <span>Ambiente seguro</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
