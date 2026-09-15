'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SecaoCabecalho from './SecaoCabecalho';
import CartaoRecurso from './CartaoRecurso';

const recursos = [
  {
    icone: <DescriptionOutlinedIcon sx={{ fontSize: 28, color: '#002045' }} />,
    corFundoIcone: '#D6E3FF',
    titulo: 'Orçamento pronto em 2 minutos',
    descricao:
      'Você digita o cliente, os serviços e os valores. O sistema calcula o desconto e o parcelamento e devolve um PDF organizado com a sua marca.',
  },
  {
    icone: <SpeedOutlinedIcon sx={{ fontSize: 28, color: '#A23E18' }} />,
    corFundoIcone: '#FFDBCF',
    titulo: 'Termômetro do teto de R$ 81 mil',
    descricao:
      'Cada serviço pago entra na soma do ano. Dá para ver quanto ainda cabe antes do desenquadramento, sem precisar de planilha.',
  },
  {
    icone: <QrCode2OutlinedIcon sx={{ fontSize: 28, color: '#137333' }} />,
    corFundoIcone: '#CEEAD6',
    titulo: 'DAS do mês com Pix Copia e Cola',
    descricao:
      'Todo mês aparece o valor do imposto e a data de vencimento. Você copia o código Pix, cola no app do banco e paga.',
  },
  {
    icone: <ReceiptLongOutlinedIcon sx={{ fontSize: 28, color: '#455F88' }} />,
    corFundoIcone: '#E2E2E9',
    titulo: 'Controle do que ainda tem a receber',
    descricao:
      'Fica claro o que já foi pago e o que está em aberto. A mensagem de cobrança sai pronta para o WhatsApp, com a chave Pix junto.',
  },
];

export default function LandingFeatures() {
  return (
    <Box id="recursos" sx={{ py: { xs: 8, md: 12 }, maxWidth: 1240, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
      <SecaoCabecalho
        etiqueta="O que dá para resolver por aqui"
        titulo="A papelada resolvida no celular, entre um serviço e outro."
      />

      <Grid container spacing={3}>
        {recursos.map((recurso) => (
          <Grid key={recurso.titulo} size={{ xs: 12, sm: 6, lg: 3 }}>
            <CartaoRecurso {...recurso} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
