'use client';

import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { ToastSeverity } from '@/hooks/useToast';

const CORES: Record<ToastSeverity, string> = {
  success: '#1E3A8A',
  info: '#1E3A8A',
  warning: '#991B1B',
  error: '#991B1B',
};

interface ToastProps {
  message: string | null;
  severity?: ToastSeverity;
  onClose: () => void;
}

/** Snackbar padrão do app — antes duplicado em cada página. */
export default function Toast({ message, severity = 'success', onClose }: ToastProps) {
  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={3500}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: '100%',
          borderRadius: '9999px',
          bgcolor: CORES[severity],
          color: '#FFFFFF',
          fontWeight: 600,
          fontSize: '0.8125rem',
          boxShadow: '0 8px 24px rgba(30, 58, 138, 0.35)',
          '& .MuiAlert-icon': { color: '#93C5FD' },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
