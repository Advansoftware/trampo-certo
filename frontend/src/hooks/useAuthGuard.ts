'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

/**
 * Protege as rotas do painel: sem sessão do Better Auth, o usuário volta
 * para o login. Enquanto a sessão é verificada, `carregando` fica true.
 */
export function useAuthGuard() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/login');
    }
  }, [isPending, session, router]);

  return { session, carregando: isPending, autenticado: Boolean(session) };
}
