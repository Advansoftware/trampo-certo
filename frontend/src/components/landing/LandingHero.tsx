'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

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
        {/* Coluna de texto */}
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
            Feito para autônomos e prestadores de serviços MEI
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
            Envie orçamentos pelo WhatsApp em 2 minutos e controle o teto do MEI.
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
            Crie propostas claras em PDF, gere cobrança via Pix com chave pronta e acompanhe quanto você faturou no ano para não levar susto com o limite de R$ 81 mil.
          </Typography>

          {/* Botões de Ação */}
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
              Ver painel de demonstração
            </Button>
          </Box>

          {/* Benefícios rápidos */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 2, sm: 3 },
              color: '#74777F',
              fontSize: '0.8125rem',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <CheckCircleOutlinedIcon sx={{ fontSize: 18, color: '#137333' }} />
              <span>Sem necessidade de cartão para começar</span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <CheckCircleOutlinedIcon sx={{ fontSize: 18, color: '#137333' }} />
              <span>PDF pronto para enviar no WhatsApp</span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <CheckCircleOutlinedIcon sx={{ fontSize: 18, color: '#137333' }} />
              <span>Cálculo automático de teto anual</span>
            </Box>
          </Box>
        </Grid>

        {/* Coluna visual com demonstração real */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              bgcolor: '#FFFFFF',
              borderRadius: '24px',
              p: { xs: 2.5, sm: 3.5 },
              boxShadow: '0 20px 45px -10px rgba(0, 32, 69, 0.12)',
              border: '1px solid rgba(226, 226, 233, 0.8)',
              position: 'relative',
            }}
          >
            {/* Cabeçalho do Card */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10B981' }} />
                <Typography sx={{ fontWeight: 700, color: '#002045', fontSize: '0.95rem' }}>
                  Termômetro Fiscal 2024
                </Typography>
              </Box>

              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '9999px',
                  bgcolor: '#E6F4EA',
                  color: '#137333',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                Margem Segura
              </Box>
            </Box>

            {/* Números principais */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1.5 }}>
              <Box>
                <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
                  Faturamento acumulado
                </Typography>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: '#002045' }}>
                  R$ 52.450,00
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
                  Margem disponível
                </Typography>
                <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#137333' }}>
                  R$ 28.550,00
                </Typography>
              </Box>
            </Box>

            {/* Barra de progresso */}
            <Box sx={{ width: '100%', bgcolor: '#EDEDF4', borderRadius: '9999px', height: 12, overflow: 'hidden', mb: 1 }}>
              <Box
                sx={{
                  height: '100%',
                  bgcolor: '#002045',
                  borderRadius: '9999px',
                  width: '64.7%',
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#74777F', mb: 3 }}>
              <span>R$ 0</span>
              <span style={{ color: '#002045', fontWeight: 700 }}>64,7% utilizado</span>
              <span>Teto: R$ 81.000</span>
            </Box>

            {/* Balão de simulação de WhatsApp */}
            <Box
              sx={{
                bgcolor: '#F0F9F4',
                border: '1px solid #D1E7DD',
                borderRadius: '16px',
                p: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <WhatsAppIcon sx={{ fontSize: 18, color: '#25D366' }} />
                <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F5132' }}>
                  Proposta enviada ao cliente
                </Typography>
              </Box>

              <Typography sx={{ fontSize: '0.8125rem', color: '#43474E', lineHeight: 1.45, mb: 1.5 }}>
                &ldquo;Olá Carlos! Aqui está seu orçamento detalhado de instalação elétrica residencial. Valor total de R$ 1.850,00 em até 2x no Pix.&rdquo;
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
                  PDF anexado • 140 KB
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#137333' }}>
                  Aprovado em 15 min
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
