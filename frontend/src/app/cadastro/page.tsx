'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import LoginHeader from '@/components/login/LoginHeader';
import LoginFooter from '@/components/login/LoginFooter';
import CadastroCard, { DadosCadastro } from '@/components/login/CadastroCard';
import { signUp, traduzirErroAuth } from '@/lib/auth-client';

export default function CadastroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  /** Cria a conta no Better Auth; o autoSignIn já deixa a sessão ativa. */
  const cadastrar = async (dados: DadosCadastro) => {
    setLoading(true);
    setErro(null);

    try {
      const resposta = await signUp.email({
        email: dados.email.trim(),
        password: dados.senha,
        name: dados.nome.trim(),
        ocupacao: dados.ocupacao.trim(),
        cnpj: dados.cnpj.trim(),
        telefone: dados.telefone.trim(),
        cidade: dados.cidade.trim(),
        chavePix: dados.chavePix.trim(),
      });

      if (resposta?.error) {
        setErro(traduzirErroAuth(resposta.error.code, resposta.error.message || 'Não foi possível criar a conta.'));
        return;
      }

      router.replace('/dashboard');
    } catch {
      setErro('Não foi possível falar com o servidor. Tente novamente em instantes.');
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
          maxWidth: 760,
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <CadastroCard
          loading={loading}
          erro={erro}
          onSubmit={cadastrar}
          onVoltarLogin={() => router.push('/login')}
        />
      </Box>

      <LoginFooter />
    </Box>
  );
}
