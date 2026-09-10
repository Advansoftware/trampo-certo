'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

const features = [
  {
    icon: <DescriptionOutlinedIcon sx={{ fontSize: 28, color: '#002045' }} />,
    bgColor: '#D6E3FF',
    title: 'Orçamentos prontos em 2 minutos',
    description:
      'Digite o nome do cliente, os serviços e o valor. O sistema calcula descontos, opções de parcelamento e gera um documento organizado em PDF com sua marca.',
  },
  {
    icon: <SpeedOutlinedIcon sx={{ fontSize: 28, color: '#A23E18' }} />,
    bgColor: '#FFDBCF',
    title: 'Termômetro do limite MEI (R$ 81 mil)',
    description:
      'Acompanhe seu faturamento somado ao longo dos meses. Você visualiza a margem livre para trabalhar sem correr o risco de desenquadramento fiscal.',
  },
  {
    icon: <QrCode2OutlinedIcon sx={{ fontSize: 28, color: '#137333' }} />,
    bgColor: '#CEEAD6',
    title: 'DAS MEI com Pix Copia e Cola',
    description:
      'Lembrete automático com valor exato do imposto do mês. Você copia a chave Pix e paga no banco em segundos, sem esquecer a data de vencimento.',
  },
  {
    icon: <ReceiptLongOutlinedIcon sx={{ fontSize: 28, color: '#455F88' }} />,
    bgColor: '#E2E2E9',
    title: 'Controle de valores a receber',
    description:
      'Saiba quais propostas já foram pagas, quais estão pendentes e envie mensagens amigáveis de cobrança com chave Pix direto pelo WhatsApp.',
  },
];

export default function LandingFeatures() {
  return (
    <Box id="recursos" sx={{ py: { xs: 8, md: 12 }, maxWidth: 1240, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
        <Typography
          sx={{
            color: '#002045',
            fontWeight: 700,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            mb: 1.5,
          }}
        >
          Tudo o que o profissional autônomo precisa
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: '#002045',
            fontSize: { xs: '1.85rem', sm: '2.4rem' },
            letterSpacing: '-0.02em',
            maxWidth: 680,
            mx: 'auto',
          }}
        >
          Menos tempo preenchendo papel, mais foco no seu trabalho.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {features.map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '24px',
                p: 3.5,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(226, 226, 233, 0.8)',
                boxShadow: '0 4px 14px rgba(0, 32, 69, 0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0, 32, 69, 0.08)',
                },
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '16px',
                  bgcolor: item.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2.5,
                }}
              >
                {item.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#002045',
                  fontSize: '1.05rem',
                  mb: 1.5,
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  color: '#43474E',
                  fontSize: '0.875rem',
                  lineHeight: 1.55,
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
