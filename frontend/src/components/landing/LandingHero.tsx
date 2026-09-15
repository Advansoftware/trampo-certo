'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import HeroDemonstracao from './HeroDemonstracao';

const garantias = [
  'Não pede cartão de crédito',
  'PDF pronto para mandar no WhatsApp',
  'O teto do ano é somado sozinho',
];

export default function LandingHero() {
  const router = useRouter();

  return (
    <Box
      sx={{
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: 1240,
        mx: 'auto',
      }}
    >
      <Grid container spacing={{ xs: 5, md: 6 }} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.75,
              borderRadius: '9999px',
              bgcolor: '#D6E3FF',
              color: '#001B3C',
              fontSize: '0.8125rem',
              fontWeight: 700,
              mb: 3,
            }}
          >
            <ShieldOutlinedIcon sx={{ fontSize: 18, color: '#002045' }} />
            Feito para autônomo e prestador de serviço MEI
          </Box>

          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '2.25rem', sm: '3rem', md: '3.35rem' },
              fontWeight: 800,
              color: '#002045',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              mb: 2.5,
            }}
          >
            Orçamento pronto em 2 minutos, do celular direto para o WhatsApp do cliente.
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '1.05rem', md: '1.2rem' },
              color: '#43474E',
              lineHeight: 1.6,
              mb: 4,
              maxWidth: 580,
            }}
          >
            A proposta sai em PDF com a sua chave Pix já dentro. E o sistema soma o que você faturou no ano, para o
            teto de R$ 81 mil não pegar você de surpresa.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mb: 3,
            }}
          >
            <Button
              onClick={() => router.push('/orcamentos/novo')}
              variant="contained"
              sx={{
                bgcolor: '#002045',
                color: '#FFFFFF',
                fontSize: '1rem',
                fontWeight: 700,
                px: 3.5,
                py: 1.75,
                borderRadius: '9999px',
                textTransform: 'none',
                boxShadow: '0 4px 18px rgba(0, 32, 69, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                '&:hover': { bgcolor: '#1A365D' },
              }}
            >
              <span>Criar orçamento grátis</span>
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Button>

            <Button
              onClick={() => router.push('/dashboard')}
              variant="outlined"
              sx={{
                borderColor: '#C4C6CF',
                color: '#002045',
                fontSize: '1rem',
                fontWeight: 600,
                px: 3,
                py: 1.75,
                borderRadius: '9999px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#002045',
                  bgcolor: 'rgba(0, 32, 69, 0.04)',
                },
              }}
            >
              Ver o painel por dentro
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 2, sm: 3 },
              color: '#74777F',
              fontSize: '0.8125rem',
            }}
          >
            {garantias.map((garantia) => (
              <Box key={garantia} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <CheckCircleOutlinedIcon sx={{ fontSize: 18, color: '#137333' }} />
                <span>{garantia}</span>
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <HeroDemonstracao />
        </Grid>
      </Grid>
    </Box>
  );
}
