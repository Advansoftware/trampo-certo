'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

export default function SecurityTrustBadges() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 2, sm: 3 },
        mt: 4,
        color: 'text.secondary',
        flexWrap: 'wrap',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <ShieldOutlinedIcon sx={{ fontSize: 18, color: 'success.main' }} />
        <Typography variant="caption" sx={{ fontWeight: 500 }}>
          Criptografia SSL 256-bit
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <VerifiedUserOutlinedIcon sx={{ fontSize: 18, color: 'primary.main' }} />
        <Typography variant="caption" sx={{ fontWeight: 500 }}>
          Sincronizado com Simples Nacional
        </Typography>
      </Box>
    </Box>
  );
}
