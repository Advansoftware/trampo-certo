'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SecaoCabecalho from './SecaoCabecalho';
import ColunaComparativa from './ColunaComparativa';

const comoSeFazHoje = [
  'Preço mandado por áudio ou mensagem solta, que o cliente esquece ou contesta na hora de pagar.',
  'Chegar cansado em casa e ainda abrir o computador para brigar com um modelo de Word ou uma planilha cheia de fórmula.',
  'Não saber quanto já faturou no ano e descobrir o desenquadramento quando a Receita avisa.',
];

const comoFicaAqui = [
  'Orçamento em PDF com material e mão de obra separados, enviado no WhatsApp do cliente.',
  'Proposta pronta em menos de 2 minutos pelo celular, ainda na casa do cliente ou na oficina.',
  'Termômetro que soma o seu faturamento e avisa antes de você encostar nos R$ 81 mil do MEI.',
];

export default function LandingPains() {
  return (
    <Box
      id="teto-mei"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#FFFFFF',
        borderTop: '1px solid rgba(226, 226, 233, 0.6)',
        borderBottom: '1px solid rgba(226, 226, 233, 0.6)',
      }}
    >
      <Box sx={{ maxWidth: 1240, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
        <SecaoCabecalho
          etiqueta="A rotina de quem trabalha por conta"
          titulo="Passar seriedade para o cliente não precisa tomar a sua noite."
          corEtiqueta="#C85A32"
          larguraTitulo={700}
        />

        <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ColunaComparativa tipo="negativo" titulo="Como muita gente ainda faz" itens={comoSeFazHoje} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ColunaComparativa tipo="positivo" titulo="Com o TrampoCerto no celular" itens={comoFicaAqui} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
