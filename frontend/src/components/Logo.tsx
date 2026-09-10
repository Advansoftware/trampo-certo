'use client';

import React from 'react';
import Box from '@mui/material/Box';

interface LogoProps {
  height?: number;
  white?: boolean;
}

export default function Logo({ height = 32, white = false }: LogoProps) {
  return (
    <Box
      component="img"
      src="/stitch-logo-icon.png"
      alt="TrampoCerto"
      sx={{
        height,
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
        ...(white ? { filter: 'brightness(0) invert(1)', opacity: 0.95 } : {}),
      }}
    />
  );
}
