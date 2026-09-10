'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';

export default function LandingPricing() {
  const router = useRouter();

  return (
    <Box id="precos" sx={{ py: { xs: 8, md: 12 }, maxWidth: 1080, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
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
          Planos e valores
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: '#002045',
            fontSize: { xs: '1.85rem', sm: '2.4rem' },
            letterSpacing: '-0.02em',
            maxWidth: 620,
            mx: 'auto',
          }}
        >
          Comece grátis. Assine apenas se o sistema pagar o próprio custo.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
        {/* Plano Gratuito */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              height: '100%',
              bgcolor: '#FFFFFF',
              borderRadius: '24px',
              p: { xs: 3.5, sm: 4.5 },
              border: '1px solid rgba(226, 226, 233, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography sx={{ color: '#74777F', fontSize: '0.875rem', fontWeight: 600, mb: 1 }}>
                Para quem está começando
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#002045', mb: 0.5 }}>
                Gratuito
              </Typography>
              <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: '#002045', mb: 3 }}>
                R$ 0 <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#74777F' }}>/mês</span>
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckIcon sx={{ color: '#137333', fontSize: 20 }} />
                  <Typography sx={{ color: '#43474E', fontSize: '0.9rem' }}>Até 10 orçamentos por mês</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckIcon sx={{ color: '#137333', fontSize: 20 }} />
                  <Typography sx={{ color: '#43474E', fontSize: '0.9rem' }}>Geração de PDF para WhatsApp</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckIcon sx={{ color: '#137333', fontSize: 20 }} />
                  <Typography sx={{ color: '#43474E', fontSize: '0.9rem' }}>Termômetro MEI do ano</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckIcon sx={{ color: '#137333', fontSize: 20 }} />
                  <Typography sx={{ color: '#43474E', fontSize: '0.9rem' }}>Lembrete de vencimento da DAS</Typography>
                </Box>
              </Box>
            </Box>

            <Button
              onClick={() => router.push('/orcamentos/novo')}
              variant="outlined"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: '9999px',
                borderColor: '#C4C6CF',
                color: '#002045',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '0.95rem',
                '&:hover': {
                  borderColor: '#002045',
                  bgcolor: 'rgba(0, 32, 69, 0.04)',
                },
              }}
            >
              Criar primeiro orçamento
            </Button>
          </Box>
        </Grid>

        {/* Plano Pro */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              height: '100%',
              bgcolor: '#002045',
              color: '#FFFFFF',
              borderRadius: '24px',
              p: { xs: 3.5, sm: 4.5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 36px rgba(0, 32, 69, 0.25)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ color: '#FFDBCF', fontSize: '0.875rem', fontWeight: 600 }}>
                  Profissional com rotina cheia
                </Typography>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '9999px',
                    bgcolor: '#A23E18',
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  Mais usado
                </Box>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 0.5 }}>
                TrampoCerto Pro
              </Typography>

              <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', mb: 3 }}>
                R$ 29,90 <span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'rgba(255, 255, 255, 0.7)' }}>/mês</span>
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckIcon sx={{ color: '#FFDBCF', fontSize: 20 }} />
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    Orçamentos e recibos ilimitados
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckIcon sx={{ color: '#FFDBCF', fontSize: 20 }} />
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    Sua logo e contatos em destaque na proposta
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckIcon sx={{ color: '#FFDBCF', fontSize: 20 }} />
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    Chave Pix Copia e Cola dentro da proposta
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckIcon sx={{ color: '#FFDBCF', fontSize: 20 }} />
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    Histórico anual para declaração DASN
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckIcon sx={{ color: '#FFDBCF', fontSize: 20 }} />
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                    Suporte direto por WhatsApp
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Button
              onClick={() => router.push('/login')}
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: '9999px',
                bgcolor: '#FFFFFF',
                color: '#002045',
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '0.95rem',
                '&:hover': {
                  bgcolor: '#F3F3FA',
                },
              }}
            >
              Assinar Plano Pro
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
