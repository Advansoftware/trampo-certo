'use client';

import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';

export interface AppButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'outlined' | 'secondary' | 'accent' | 'text' | 'surface' | 'table-action';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
}

export default function AppButton({
  children,
  variant = 'primary',
  size = 'medium',
  sx,
  ...props
}: AppButtonProps) {
  // Configurações de padding e fonte idênticas ao Stitch (font-label-sm, font-label-md, font-label-lg)
  const sizeStyles = {
    xsmall: {
      py: '5px',
      px: '14px',
      fontSize: '11px',
      lineHeight: '14px',
      letterSpacing: '0.02em',
      fontWeight: 600,
    },
    small: {
      py: '7px',
      px: '18px',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 600,
    },
    medium: {
      py: '10px',
      px: '22px',
      fontSize: '13px',
      lineHeight: '18px',
      fontWeight: 600,
    },
    large: {
      py: '13px',
      px: '28px',
      fontSize: '15px',
      lineHeight: '22px',
      fontWeight: 700,
    },
  }[size];

  // Variantes visuais 100% fiéis ao Stitch
  const variantStyles = {
    // bg-primary hover:bg-primary-hover text-white rounded-full shadow-sm hover:shadow
    primary: {
      bgcolor: '#1E3A8A',
      color: '#FFFFFF',
      boxShadow: '0 1px 3px rgba(30, 58, 138, 0.2)',
      '&:hover': {
        bgcolor: '#1D4ED8',
        boxShadow: '0 4px 14px rgba(30, 58, 138, 0.35)',
        transform: 'translateY(-1px)',
      },
      '&:active': {
        transform: 'scale(0.96)',
      },
    },
    // bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-on-surface
    outlined: {
      bgcolor: '#F1F4F9',
      color: '#1A1B20',
      border: '1px solid rgba(196, 198, 207, 0.4)',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
      '&:hover': {
        bgcolor: '#E8EDF5',
        borderColor: 'rgba(196, 198, 207, 0.7)',
        transform: 'translateY(-1px)',
      },
      '&:active': {
        transform: 'scale(0.96)',
      },
    },
    surface: {
      bgcolor: '#F1F4F9',
      color: '#1A1B20',
      border: '1px solid rgba(196, 198, 207, 0.4)',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
      '&:hover': {
        bgcolor: '#E8EDF5',
        borderColor: 'rgba(196, 198, 207, 0.7)',
        transform: 'translateY(-1px)',
      },
      '&:active': {
        transform: 'scale(0.96)',
      },
    },
    // Botão de tabela "Marcar Pago": fundo cinza suave que ao hover fica azul primary com texto branco
    'table-action': {
      bgcolor: '#F1F4F9',
      color: '#1A1B20',
      border: '1px solid rgba(196, 198, 207, 0.35)',
      boxShadow: 'none',
      '&:hover': {
        bgcolor: '#1E3A8A',
        color: '#FFFFFF',
        borderColor: '#1E3A8A',
        boxShadow: '0 3px 10px rgba(30, 58, 138, 0.3)',
        transform: 'translateY(-1px)',
      },
      '&:active': {
        transform: 'scale(0.96)',
      },
    },
    secondary: {
      bgcolor: '#2563EB',
      color: '#FFFFFF',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
      '&:hover': {
        bgcolor: '#1E3A8A',
        boxShadow: '0 4px 14px rgba(30, 58, 138, 0.35)',
        transform: 'translateY(-1px)',
      },
      '&:active': {
        transform: 'scale(0.96)',
      },
    },
    accent: {
      bgcolor: '#0F172A',
      color: '#F1F5F9',
      boxShadow: '0 2px 8px rgba(15, 23, 42, 0.2)',
      '&:hover': {
        bgcolor: '#000000',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
        transform: 'translateY(-1px)',
      },
      '&:active': {
        transform: 'scale(0.96)',
      },
    },
    text: {
      bgcolor: 'transparent',
      color: '#2563EB',
      '&:hover': {
        color: '#1E3A8A',
        bgcolor: 'rgba(37, 99, 235, 0.06)',
        transform: 'translateY(-1px)',
      },
      '&:active': {
        transform: 'scale(0.96)',
      },
    },
  }[variant];

  return (
    <Button
      disableElevation
      disableRipple
      {...props}
      sx={{
        borderRadius: '9999px',
        fontFamily: 'var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif',
        textTransform: 'none',
        transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        userSelect: 'none',
        ...sizeStyles,
        ...variantStyles,
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}

