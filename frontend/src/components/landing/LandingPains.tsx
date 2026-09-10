'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export default function LandingPains() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#FFFFFF',
        borderTop: '1px solid rgba(226, 226, 233, 0.6)',
        borderBottom: '1px solid rgba(226, 226, 233, 0.6)',
      }}
    >
      <Box sx={{ maxWidth: 1240, mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              color: '#C85A32',
              fontWeight: 700,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              mb: 1.5,
            }}
          >
            A rotina real de quem trabalha por conta
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#002045',
              fontSize: { xs: '1.85rem', sm: '2.4rem' },
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            Passar credibilidade para o cliente não precisa tomar horas da sua noite.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
          {/* Card: O jeito improvisado */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                height: '100%',
                bgcolor: '#FFF8F6',
                border: '1px solid #FFDCD5',
                borderRadius: '24px',
                p: { xs: 3, sm: 4 },
              }}
            >
              <Typography
                sx={{
                  color: '#BA1A1A',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  mb: 3,
                }}
              >
                Como muitos autônomos ainda fazem
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: '#FFDAD6',
                      color: '#BA1A1A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Typography sx={{ color: '#43474E', fontSize: '0.925rem', lineHeight: 1.5 }}>
                    Mandar valores por mensagem de texto ou áudio que o cliente esquece ou contesta na hora de pagar.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: '#FFDAD6',
                      color: '#BA1A1A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Typography sx={{ color: '#43474E', fontSize: '0.925rem', lineHeight: 1.5 }}>
                    Chegar cansado em casa para abrir computador e brigar com modelo de Word ou planilha cheia de fórmulas.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: '#FFDAD6',
                      color: '#BA1A1A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Typography sx={{ color: '#43474E', fontSize: '0.925rem', lineHeight: 1.5 }}>
                    Não ter controle do faturamento do ano e correr risco de desenquadrar de surpresa na Receita Federal.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Card: Com o TrampoCerto */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                height: '100%',
                bgcolor: '#F3F8F5',
                border: '1px solid #C4E7D3',
                borderRadius: '24px',
                p: { xs: 3, sm: 4 },
              }}
            >
              <Typography
                sx={{
                  color: '#137333',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  mb: 3,
                }}
              >
                Com o TrampoCerto no celular
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: '#CEEAD6',
                      color: '#137333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Typography sx={{ color: '#43474E', fontSize: '0.925rem', lineHeight: 1.5 }}>
                    Orçamento limpo em PDF e link direto no WhatsApp, com discriminação clara de materiais e mão de obra.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: '#CEEAD6',
                      color: '#137333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Typography sx={{ color: '#43474E', fontSize: '0.925rem', lineHeight: 1.5 }}>
                    Proposta pronta em menos de 2 minutos direto pelo celular, ainda no endereço do cliente ou na oficina.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: '#CEEAD6',
                      color: '#137333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      mt: 0.25,
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Typography sx={{ color: '#43474E', fontSize: '0.925rem', lineHeight: 1.5 }}>
                    Termômetro visual que calcula seus ganhos e avisa antes de você ultrapassar os R$ 81 mil da categoria MEI.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
