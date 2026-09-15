'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import LoginFormFields from './LoginFormFields';
import LoginSocialButtons from './LoginSocialButtons';
import SecurityTrustBadges from './SecurityTrustBadges';

interface LoginCardProps {
  identifier: string;
  setIdentifier: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onGovBrLogin: () => void;
  onGoogleLogin: () => void;
  onForgotPassword: () => void;
  onRegisterClick: () => void;
}

export default function LoginCard({
  identifier,
  setIdentifier,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  loading,
  error,
  onSubmit,
  onGovBrLogin,
  onGoogleLogin,
  onForgotPassword,
  onRegisterClick,
}: LoginCardProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box
        sx={{
          bgcolor: '#FFFFFF',
          borderRadius: '28px',
          p: { xs: 3, sm: 4, lg: 5 },
          boxShadow: '0 4px 20px rgba(0, 32, 69, 0.05)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(226, 226, 233, 0.6)',
        }}
      >
        {/* Brilho decorativo no canto superior */}
        <Box
          sx={{
            position: 'absolute',
            top: -96,
            left: -96,
            width: 256,
            height: 256,
            bgcolor: 'rgba(214, 227, 255, 0.4)',
            borderRadius: '50%',
            filter: 'blur(64px)',
            pointerEvents: 'none',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, mb: 3 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 0.5,
              borderRadius: 9999,
              bgcolor: '#D6E3FF',
              color: '#001B3C',
              fontSize: '0.75rem',
              fontWeight: 600,
              mb: 1,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: '#002045',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(0.95)', opacity: 0.8 },
                  '50%': { transform: 'scale(1.2)', opacity: 1 },
                  '100%': { transform: 'scale(0.95)', opacity: 0.8 },
                },
              }}
            />
            Acesso seguro MEI
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#002045',
              letterSpacing: '-0.02em',
              fontSize: { xs: '1.75rem', sm: '2rem' },
              mb: 1,
            }}
          >
            Acesse o TrampoCerto
          </Typography>

          <Typography sx={{ fontSize: '0.875rem', color: '#43474E', lineHeight: 1.5, maxWidth: 480 }}>
            Entre para ver seus orçamentos, seus recibos e quanto você já faturou no ano.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        <LoginSocialButtons onGovBrLogin={onGovBrLogin} onGoogleLogin={onGoogleLogin} />

        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', my: 2.5 }}>
          <Box sx={{ flexGrow: 1, height: '1px', bgcolor: 'rgba(196, 198, 207, 0.4)' }} />
          <Typography
            sx={{
              px: 2,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#74777F',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            ou entre com seu e-mail
          </Typography>
          <Box sx={{ flexGrow: 1, height: '1px', bgcolor: 'rgba(196, 198, 207, 0.4)' }} />
        </Box>

        <LoginFormFields
          identifier={identifier}
          setIdentifier={setIdentifier}
          password={password}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          loading={loading}
          onSubmit={onSubmit}
          onForgotPassword={onForgotPassword}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            mt: 3,
            pt: 2.5,
            borderTop: '1px solid rgba(226, 226, 233, 0.6)',
          }}
        >
          <Typography sx={{ fontSize: '0.875rem', color: '#43474E' }}>
            Ainda não tem conta?{' '}
            <Typography
              component="span"
              onClick={onRegisterClick}
              sx={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#002045',
                cursor: 'pointer',
                ml: 0.5,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Criar grátis em 1 minuto
            </Typography>
          </Typography>
        </Box>
      </Box>

      <SecurityTrustBadges />
    </Box>
  );
}
