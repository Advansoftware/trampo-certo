'use client';

import { useCallback, useState } from 'react';

export type ToastSeverity = 'success' | 'info' | 'warning' | 'error';

export interface ToastState {
  message: string | null;
  severity: ToastSeverity;
}

/** Feedback curto das telas (Snackbar), com atalho para erros da API. */
export function useToast() {
  const [toast, setToast] = useState<ToastState>({ message: null, severity: 'success' });

  const showToast = useCallback((message: string, severity: ToastSeverity = 'success') => {
    setToast({ message, severity });
  }, []);

  const showError = useCallback((erro: unknown, fallback = 'Não foi possível concluir a operação.') => {
    setToast({ message: erro instanceof Error ? erro.message : fallback, severity: 'error' });
  }, []);

  const hideToast = useCallback(() => {
    setToast((anterior) => ({ ...anterior, message: null }));
  }, []);

  return { toast, showToast, showError, hideToast };
}
