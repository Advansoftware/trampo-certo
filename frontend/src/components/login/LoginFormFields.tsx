'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.75, display: 'block' }}>
          CNPJ ou E-mail
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="ex: 45.123.789/0001-90 ou seu@email.com"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Box>
        <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.75, display: 'block' }}>
          Sua senha cadastrada
        </Typography>
        <TextField
          fullWidth
          size="small"
          type={showPassword ? 'text' : 'password'}
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              sx={{ color: 'primary.main', '&.Mui-checked': { color: 'primary.main' } }}
            />
          }
          label={
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Lembrar de mim
            </Typography>
          }
        />
        <Typography
          variant="caption"
          onClick={onForgotPassword}
          sx={{
            color: 'secondary.main',
            fontWeight: 700,
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Esqueci a senha
        </Typography>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{
          py: 1.4,
          fontSize: '0.95rem',
          fontWeight: 700,
          borderRadius: 9999,
          mt: 1,
          bgcolor: 'primary.main',
          boxShadow: '0px 4px 14px rgba(0, 32, 69, 0.2)',
          '&:hover': { bgcolor: 'primary.light' },
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar na minha conta'}
      </Button>
    </Box>
  );
}
