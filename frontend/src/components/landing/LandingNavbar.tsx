'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Logo from '@/components/Logo';
import { linksLanding } from './linksLanding';

export default function LandingNavbar() {
  const router = useRouter();

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        bgcolor: 'rgba(249, 249, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(226, 226, 233, 0.7)',
      }}
    >
      <Box
        sx={{
          maxWidth: 1240,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
          <Logo height={38} />
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
          {linksLanding.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              underline="none"
              sx={{
                color: '#43474E',
                fontSize: '0.9rem',
                fontWeight: 600,
                '&:hover': { color: '#002045' },
              }}
            >
              {link.label}
            </Link>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Button
            onClick={() => router.push('/login')}
            variant="text"
            sx={{
              color: '#002045',
              fontWeight: 600,
              px: 2,
              borderRadius: '9999px',
              textTransform: 'none',
              fontSize: '0.9rem',
            }}
          >
            Entrar
          </Button>

          <Button
            onClick={() => router.push('/login')}
            variant="contained"
            sx={{
              bgcolor: '#002045',
              color: '#FFFFFF',
              fontWeight: 600,
              px: 2.5,
              py: 1,
              borderRadius: '9999px',
              textTransform: 'none',
              fontSize: '0.9rem',
              boxShadow: '0 4px 14px rgba(0, 32, 69, 0.2)',
              '&:hover': { bgcolor: '#1A365D' },
            }}
          >
            Criar conta grátis
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
