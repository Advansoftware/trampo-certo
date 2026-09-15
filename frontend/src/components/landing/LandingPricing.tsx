'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SecaoCabecalho from './SecaoCabecalho';
import CartaoPlano from './CartaoPlano';

const itensGratuito = [
  'Até 10 orçamentos por mês',
  'PDF pronto para mandar no WhatsApp',
  'Termômetro do teto do ano',
  'Aviso de vencimento da DAS',
];

const itensPro = [
  'Orçamentos e recibos sem limite',
  'Sua logo e seus contatos na proposta',
  'Chave Pix Copia e Cola dentro da proposta',
  'Histórico do ano para a declaração DASN',
  'Suporte por WhatsApp',
];

export default function LandingPricing() {
  const router = useRouter();

  return (
    <Box id="precos" sx={{ py: { xs: 8, md: 12 }, maxWidth: 1080, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
      <SecaoCabecalho
        etiqueta="Planos e valores"
        titulo="Comece grátis. Assine quando o sistema já estiver pagando o próprio custo."
        larguraTitulo={620}
      />

      <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CartaoPlano
            etiqueta="Para quem está começando"
            nome="Gratuito"
            preco="R$ 0"
            itens={itensGratuito}
            acaoLabel="Criar o primeiro orçamento"
            onAcao={() => router.push('/orcamentos/novo')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CartaoPlano
            destaque
            selo="Mais completo"
            etiqueta="Para quem tem a agenda cheia"
            nome="TrampoCerto Pro"
            preco="R$ 29,90"
            itens={itensPro}
            acaoLabel="Assinar o Pro"
            onAcao={() => router.push('/login')}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
