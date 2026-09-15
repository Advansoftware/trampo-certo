'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SecaoCabecalho from './SecaoCabecalho';
import CartaoDepoimento from './CartaoDepoimento';

const depoimentos = [
  {
    nome: 'Rodrigo Silva',
    ocupacao: 'Eletricista residencial',
    cidade: 'São Paulo, SP',
    foto: '/rodrigo-avatar.jpg',
    depoimento:
      'Eu mandava o preço por áudio e metade das pessoas nem respondia. Hoje eu monto o PDF ali mesmo, na casa do cliente, e a resposta vem bem mais rápido.',
  },
  {
    nome: 'Camila Rocha',
    ocupacao: 'Designer gráfica',
    cidade: 'Belo Horizonte, MG',
    corAvatar: '#002045',
    depoimento:
      'Eu tinha pavor de passar do teto do MEI sem perceber e receber uma notificação da Receita. Agora eu abro o app e vejo quanto ainda posso faturar até dezembro.',
  },
  {
    nome: 'Marcos Antunes',
    ocupacao: 'Marcenaria sob medida',
    cidade: 'Curitiba, PR',
    depoimento:
      'O que me pegou foi a condição de pagamento já escrita: 50% de entrada no Pix para o material e o resto na entrega. O cliente vê tudo discriminado e para de pedir desconto.',
  },
];

export default function LandingTestimonials() {
  return (
    <Box
      id="depoimentos"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#F3F3FA',
        borderTop: '1px solid rgba(226, 226, 233, 0.7)',
        borderBottom: '1px solid rgba(226, 226, 233, 0.7)',
      }}
    >
      <Box sx={{ maxWidth: 1240, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
        <SecaoCabecalho
          etiqueta="Quem já usa"
          titulo="Gente que vive de serviço e não tem tempo para papelada."
        />

        <Grid container spacing={3.5}>
          {depoimentos.map((item) => (
            <Grid key={item.nome} size={{ xs: 12, md: 4 }}>
              <CartaoDepoimento {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
