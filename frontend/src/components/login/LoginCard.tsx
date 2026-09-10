'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LoginIcon from '@mui/icons-material/Login';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

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
  onRegisterClick,
}: LoginCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Form Card */}
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
        {/* Subtle decorative cobalt glow */}
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

        {/* Header / Identity within Form */}
        <Box sx={{ position: 'relative', zIndex: 1, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
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
              Acesso Seguro MEI
            </Box>
            <Typography sx={{ fontSize: '0.75rem', color: '#74777F', fontWeight: 500 }}>
              Versão 2.4
            </Typography>
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
            Gestão simplificada de orçamentos, recibos e teto fiscal para o MEI moderno. Emita em segundos e foque no seu serviço.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        {/* Quick Social / Gov Authentication (Brazilian MEI Context) */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1.5,
            mb: 3,
          }}
        >
          {/* Gov.br Primary Pill */}
          <Button
            onClick={onGovBrLogin}
            variant="contained"
            sx={{
              flex: 1,
              py: 1.5,
              px: 2.5,
              borderRadius: 9999,
              bgcolor: '#1351B4',
              color: '#FFFFFF',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              boxShadow: '0 2px 8px rgba(19, 81, 180, 0.25)',
              '&:hover': {
                bgcolor: '#0c3c88',
              },
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                bgcolor: '#FFFFFF',
                color: '#1351B4',
                fontSize: '11px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              BR
            </Box>
            <span>Entrar com Gov.br</span>
            <ArrowForwardIcon sx={{ fontSize: 16, opacity: 0.8 }} />
          </Button>

          {/* Google Pill */}
          <Button
            onClick={onGoogleLogin}
            variant="contained"
            sx={{
              flex: 1,
              py: 1.5,
              px: 2.5,
              borderRadius: 9999,
              bgcolor: '#E8E7EE',
              color: '#1A1B20',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#E2E2E9',
              },
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            <span>Google</span>
          </Button>
        </Box>

        {/* Divider */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            my: 2.5,
          }}
        >
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
            ou continue com seu e-mail
          </Typography>
          <Box sx={{ flexGrow: 1, height: '1px', bgcolor: 'rgba(196, 198, 207, 0.4)' }} />
        </Box>

        {/* Interactive Form */}
        <Box component="form" onSubmit={onSubmit} sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Email / CNPJ / CPF Input Field */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
              <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#43474E' }}>
                E-mail, CPF ou CNPJ
              </Typography>
              <Typography sx={{ fontSize: '0.6875rem', color: '#74777F' }}>
                Aceita gov.br
              </Typography>
            </Box>

            <TextField
              fullWidth
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="ex: 00.000.000/0001-00 ou seu@email.com"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlinedIcon sx={{ color: '#74777F', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: '#F3F3FA',
                    borderRadius: '16px',
                    height: 54,
                    '& fieldset': { borderColor: 'transparent' },
                    '&:hover fieldset': { borderColor: 'rgba(0, 32, 69, 0.2)' },
                    '&.Mui-focused fieldset': { borderColor: '#002045', borderWidth: 2 },
                  },
                },
              }}
            />
          </Box>

          {/* Password Input Field */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
              <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#43474E' }}>
                Senha de Acesso
              </Typography>
              <Typography
                component="a"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Instruções de recuperação foram enviadas para seu e-mail!');
                }}
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#002045',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Esqueceu a senha?
              </Typography>
            </Box>

            <TextField
              fullWidth
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha cadastrada"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: '#74777F', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: '#74777F' }}
                      >
                        {showPassword ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: '#F3F3FA',
                    borderRadius: '16px',
                    height: 54,
                    '& fieldset': { borderColor: 'transparent' },
                    '&:hover fieldset': { borderColor: 'rgba(0, 32, 69, 0.2)' },
                    '&.Mui-focused fieldset': { borderColor: '#002045', borderWidth: 2 },
                  },
                },
              }}
            />
          </Box>

          {/* Remember Me */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 0.5 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                  sx={{
                    color: '#002045',
                    '&.Mui-checked': { color: '#002045' },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: '0.8125rem', color: '#43474E' }}>
                  Lembrar deste dispositivo por 30 dias
                </Typography>
              }
            />
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            variant="contained"
            sx={{
              mt: 1,
              height: 54,
              borderRadius: 9999,
              bgcolor: '#002045',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: '0 4px 14px rgba(0, 32, 69, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              '&:hover': {
                bgcolor: '#1A365D',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
            ) : (
              <>
                <span>Entrar na minha conta</span>
                <LoginIcon sx={{ fontSize: 20 }} />
              </>
            )}
          </Button>
        </Box>

        {/* Register Prompt */}
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
            Ainda não tem conta no TrampoCerto?{' '}
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

      {/* Security Pill Banner below login */}
      <Box
        sx={{
          mt: 2.5,
          px: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1.5,
          color: '#74777F',
          fontSize: '0.75rem',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <LockClockOutlinedIcon sx={{ fontSize: 16, color: '#002045' }} />
          <span>Criptografia bancária TLS 1.3</span>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: '#C85A32' }} />
          <span>Integrado com a Receita Federal</span>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <VerifiedOutlinedIcon sx={{ fontSize: 16, color: '#74777F' }} />
          <span>Conforme LGPD</span>
        </Box>
      </Box>
    </Box>
  );
}
