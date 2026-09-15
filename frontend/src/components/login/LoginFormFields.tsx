'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LoginIcon from '@mui/icons-material/Login';
import CampoLogin from './CampoLogin';

interface LoginFormFieldsProps {
  identifier: string;
  setIdentifier: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword?: () => void;
}

/** Campos de e-mail e senha do acesso por formulário. */
export default function LoginFormFields({
  identifier,
  setIdentifier,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  loading,
  onSubmit,
  onForgotPassword,
}: LoginFormFieldsProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <CampoLogin
        id="identifier"
        label="E-mail, CPF ou CNPJ"
        valor={identifier}
        onChange={setIdentifier}
        placeholder="00.000.000/0001-00 ou seu@email.com"
        icone={<BadgeOutlinedIcon sx={{ color: '#74777F', fontSize: 20 }} />}
      />

      <CampoLogin
        id="password"
        label="Senha"
        type={mostrarSenha ? 'text' : 'password'}
        valor={password}
        onChange={setPassword}
        placeholder="Sua senha"
        icone={<LockOutlinedIcon sx={{ color: '#74777F', fontSize: 20 }} />}
        acessorioLabel={
          onForgotPassword && (
            <Typography
              component="button"
              type="button"
              onClick={onForgotPassword}
              sx={{
                border: 'none',
                bgcolor: 'transparent',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#002045',
                p: 0,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Esqueceu a senha?
            </Typography>
          )
        }
        acessorioFinal={
          <IconButton
            onClick={() => setMostrarSenha(!mostrarSenha)}
            edge="end"
            size="small"
            aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            sx={{ color: '#74777F' }}
          >
            {mostrarSenha ? (
              <VisibilityOffOutlinedIcon fontSize="small" />
            ) : (
              <VisibilityOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        }
      />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 0.5 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(evento) => setRememberMe(evento.target.checked)}
              size="small"
              sx={{ color: '#002045', '&.Mui-checked': { color: '#002045' } }}
            />
          }
          label={
            <Typography sx={{ fontSize: '0.8125rem', color: '#43474E' }}>
              Lembrar deste aparelho por 30 dias
            </Typography>
          }
        />
      </Box>

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
          '&:hover': { bgcolor: '#1A365D' },
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
  );
}
