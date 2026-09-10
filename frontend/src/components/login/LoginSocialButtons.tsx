'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface LoginSocialButtonsProps {
  onGovBrLogin: () => void;
  onGoogleLogin: () => void;
}

export default function LoginSocialButtons({
  onGovBrLogin,
  onGoogleLogin,
}: LoginSocialButtonsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
      {/* Official Gov.br Button */}
      <Button
        fullWidth
        variant="contained"
        onClick={onGovBrLogin}
        sx={{
          bgcolor: '#002045',
          color: '#FFFFFF',
          py: 1.3,
          borderRadius: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2.5,
          boxShadow: 'none',
          '&:hover': {
            bgcolor: '#1A365D',
            boxShadow: '0px 2px 8px rgba(0, 32, 69, 0.15)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              color: '#002045',
              px: 0.9,
              py: 0.3,
              borderRadius: 1,
              fontSize: '0.7rem',
              fontWeight: 800,
            }}
          >
            BR
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            Entrar com Gov.br
          </Typography>
        </Box>
        <ArrowForwardIcon sx={{ fontSize: 18 }} />
      </Button>

      {/* Google Button */}
      <Button
        fullWidth
        variant="outlined"
        onClick={onGoogleLogin}
        sx={{
          py: 1.2,
          borderRadius: 3,
          borderColor: 'rgba(116, 119, 127, 0.25)',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'rgba(0, 32, 69, 0.02)',
          },
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 24 24"
          sx={{ width: 18, height: 18 }}
        >
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Continuar com o Google
        </Typography>
      </Button>
    </Box>
  );
}
