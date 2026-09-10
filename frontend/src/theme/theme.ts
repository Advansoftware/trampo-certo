'use client';

import { createTheme } from '@mui/material/styles';

export const trampoCertoTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1E3A8A',
      light: '#1D4ED8',
      dark: '#172554',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2563EB',
      light: '#3B82F6',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8F9FD',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1B20',
      secondary: '#43474E',
    },
    error: {
      main: '#BA1A1A',
      light: '#FFDAD6',
      dark: '#93000A',
    },
    warning: {
      main: '#D97706',
      light: '#FFFBEB',
      dark: '#92400E',
    },
    success: {
      main: '#137333',
      light: '#E6F4EA',
      dark: '#0D5324',
    },
    divider: 'rgba(116, 119, 127, 0.16)',
  },
  typography: {
    fontFamily: 'var(--font-plus-jakarta-sans), var(--font-inter), sans-serif',
    h1: {
      fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
      fontWeight: 600,
    },
    subtitle2: {
      fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: 'var(--font-inter), sans-serif',
      fontSize: '0.975rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'var(--font-inter), sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 9999,
          fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          '&:active': {
            transform: 'scale(0.96)',
          },
        },
        contained: {
          backgroundColor: '#1E3A8A',
          color: '#FFFFFF',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          '&:hover': {
            backgroundColor: '#1D4ED8',
            boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          backgroundColor: '#F1F4F9',
          borderColor: 'rgba(196, 198, 207, 0.4)',
          color: '#1A1B20',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          '&:hover': {
            backgroundColor: '#E8EDF5',
            borderColor: 'rgba(196, 198, 207, 0.7)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(222, 226, 235, 0.8)',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.02)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          fontWeight: 600,
          fontSize: '0.75rem',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#F3F3FA',
          '& fieldset': {
            borderColor: 'rgba(116, 119, 127, 0.2)',
          },
          '&:hover fieldset': {
            borderColor: '#002045',
          },
          '&.Mui-focused': {
            backgroundColor: '#FFFFFF',
            '& fieldset': {
              borderColor: '#002045',
              borderWidth: 2,
            },
          },
        },
      },
    },
  },
});
