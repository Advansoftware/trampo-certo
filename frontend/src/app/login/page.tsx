'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoginHeader from '@/components/login/LoginHeader';
import LoginCard from '@/components/login/LoginCard';
import LoginShowcaseCard from '@/components/login/LoginShowcaseCard';
import LoginFooter from '@/components/login/LoginFooter';
import { signIn, traduzirErroAuth } from '@/lib/auth-client';

const AVISO_SOCIAL = 'O login social ainda não está habilitado. Entre com e-mail e senha.';

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Autenticação real: só navega para o painel quando a sessão é criada. */
  const handleSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const resposta = await signIn.email({ email: identifier.trim(), password });

      if (resposta?.error) {
        setError(traduzirErroAuth(resposta.error.code, resposta.error.message || 'Não foi possível entrar.'));
        return;
      }

      router.replace('/dashboard');
    } catch {
      setError('Não foi possível falar com o servidor. Tente novamente em instantes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#F3F3FA', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LoginHeader />

      <Box
        component="main"
        sx={{
          flex: 1,
          pt: { xs: 10, md: 12 },
          pb: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
          width: '100%',
          maxWidth: 1360,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={{ xs: 3, lg: 5 }} sx={{ alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <LoginCard
              identifier={identifier}
              setIdentifier={setIdentifier}
              password={password}
              setPassword={setPassword}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              loading={loading}
              error={error}
              onSubmit={handleSubmit}
              onGovBrLogin={() => setError(AVISO_SOCIAL)}
              onGoogleLogin={() => setError(AVISO_SOCIAL)}
              onRegisterClick={() => router.push('/cadastro')}
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <LoginShowcaseCard />
          </Grid>
        </Grid>
      </Box>

      <LoginFooter />
    </Box>
  );
}
