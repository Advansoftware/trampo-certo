'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SpeedIcon from '@mui/icons-material/Speed';
import AppButton from '@/components/common/AppButton';

interface ReferralHeroProps {
  referrerName: string;
  slug: string;
}

export default function ReferralHero({ referrerName, slug }: ReferralHeroProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const couponCode = slug.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 10) || 'AMIGO-PRO';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(`/login?ref=${encodeURIComponent(slug)}&cupom=${couponCode}`);
    }, 600);
  };

  return (
    <Box
      sx={{
        pt: { xs: 4, md: 7 },
        pb: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2.5, sm: 4, lg: 6 } }}>
        {/* Inviter Badge Pill */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.5,
            p: 0.75,
            pr: 2.5,
            borderRadius: '9999px',
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(196, 198, 207, 0.4)',
            boxShadow: '0 2px 8px rgba(30, 41, 59, 0.04)',
            mb: 3,
          }}
        >
          <Avatar
            src="/rodrigo-avatar.jpg"
            alt={referrerName}
            sx={{ width: 34, height: 34, border: '2px solid #DBEAFE' }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1B20' }}>
              {referrerName}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#74777F', display: { xs: 'none', sm: 'inline' } }}>
              te enviou um convite exclusivo
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.25,
              py: 0.25,
              borderRadius: '9999px',
              bgcolor: '#DCFCE7',
              color: '#166534',
              fontSize: '0.6875rem',
              fontWeight: 700,
            }}
          >
            <VerifiedUserIcon sx={{ fontSize: 13 }} />
            MEI Verificado
          </Box>
        </Box>

        <Grid container spacing={{ xs: 4, lg: 6 }} sx={{ alignItems: 'center' }}>
          {/* Left Column: Headline & Signup Card */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                color: '#1A1B20',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                mb: 2,
              }}
            >
              Você ganhou{' '}
              <Box component="span" sx={{ color: '#1E3A8A' }}>
                30 dias grátis
              </Box>{' '}
              do TrampoCerto Pro!
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                color: '#43474E',
                lineHeight: 1.6,
                mb: 4,
                maxWidth: 620,
              }}
            >
              A ferramenta feita sob medida para autônomos e MEIs emitirem orçamentos comerciais impecáveis em PDF, receberem via Pix e acompanharem o teto anual da Receita Federal.
            </Typography>

            {/* Signup Form Card */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid rgba(196, 198, 207, 0.4)',
                borderRadius: '24px',
                p: { xs: 3, sm: 4 },
                boxShadow: '0 8px 30px rgba(30, 41, 59, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
              }}
            >
              {/* Coupon Activated Banner */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  px: 2,
                  borderRadius: '16px',
                  bgcolor: '#EFF6FF',
                  border: '1px solid rgba(191, 219, 254, 0.8)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                  <CardGiftcardIcon sx={{ color: '#1E3A8A', fontSize: 22 }} />
                  <Box>
                    <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#172554' }}>
                      Cupom Ativado: {couponCode}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#1E40AF' }}>
                      1 mês 100% gratuito liberado por {referrerName}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.35,
                    borderRadius: '9999px',
                    bgcolor: '#1E3A8A',
                    color: '#FFFFFF',
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                  }}
                >
                  100% OFF
                </Box>
              </Box>

              {/* Input Fields */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: '#74777F', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: '14px',
                        bgcolor: '#F8F9FD',
                        fontSize: '0.875rem',
                      },
                    },
                  }}
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      placeholder="WhatsApp (ex: 11 99999-9999)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIphoneIcon sx={{ color: '#74777F', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: '14px',
                            bgcolor: '#F8F9FD',
                            fontSize: '0.875rem',
                          },
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      placeholder="Seu melhor e-mail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ color: '#74777F', fontSize: 20 }} />
                            </InputAdornment>
                          ),
                          sx: {
                            borderRadius: '14px',
                            bgcolor: '#F8F9FD',
                            fontSize: '0.875rem',
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Submit CTA */}
              <AppButton
                variant="primary"
                size="large"
                type="submit"
                disabled={loading}
                endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
                sx={{
                  py: 1.6,
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 14px rgba(30, 58, 138, 0.3)',
                }}
              >
                {loading ? 'Ativando seu plano...' : 'Ativar Meus 30 Dias Grátis Agora'}
              </AppButton>

              {/* Trust badges */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: { xs: 1.5, sm: 2.5 },
                  pt: 1,
                  fontSize: '0.75rem',
                  color: '#74777F',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CheckCircleIcon sx={{ fontSize: 15, color: '#166534' }} />
                  <span>Sem cartão para começar</span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CheckCircleIcon sx={{ fontSize: 15, color: '#166534' }} />
                  <span>Acesso imediato</span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CheckCircleIcon sx={{ fontSize: 15, color: '#166534' }} />
                  <span>Cancele quando quiser</span>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Visual Feature Showcase Mockup */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Box sx={{ position: 'relative' }}>
              {/* Main Mockup Card */}
              <Box
                sx={{
                  bgcolor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid rgba(196, 198, 207, 0.4)',
                  boxShadow: '0 16px 40px -8px rgba(30, 41, 59, 0.12)',
                  p: 3.5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                {/* Proposal Mock Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2, borderBottom: '1px solid rgba(196, 198, 207, 0.3)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        bgcolor: '#1E3A8A',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.875rem',
                      }}
                    >
                      TC
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1B20' }}>
                        Orçamento #042
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
                        Pronto para envio em PDF
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.4,
                      borderRadius: '9999px',
                      bgcolor: '#DCFCE7',
                      color: '#166534',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    Aprovado
                  </Box>
                </Box>

                {/* Service Highlights */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                    <span style={{ color: '#43474E', fontWeight: 500 }}>Instalação elétrica & tomadas</span>
                    <strong style={{ color: '#1A1B20' }}>R$ 850,00</strong>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                    <span style={{ color: '#43474E', fontWeight: 500 }}>Quadro de distribuição DIN</span>
                    <strong style={{ color: '#1A1B20' }}>R$ 950,00</strong>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      pt: 1.5,
                      borderTop: '1px dashed rgba(196, 198, 207, 0.4)',
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: '#1E3A8A',
                    }}
                  >
                    <span>Total Proposta</span>
                    <span>R$ 1.800,00</span>
                  </Box>
                </Box>

                {/* MEI Thermometer Widget Inside Mockup */}
                <Box
                  sx={{
                    bgcolor: '#F8F9FD',
                    borderRadius: '16px',
                    p: 2,
                    border: '1px solid rgba(196, 198, 207, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.75rem', fontWeight: 700, color: '#1E3A8A' }}>
                      <SpeedIcon sx={{ fontSize: 16 }} />
                      <span>Termômetro Limite MEI</span>
                    </Box>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E3A8A' }}>52% seguro</span>
                  </Box>
                  <Box sx={{ width: '100%', height: 7, bgcolor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <Box sx={{ width: '52%', height: '100%', bgcolor: '#1E3A8A', borderRadius: '9999px' }} />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#74777F' }}>
                    <span>R$ 42.120 acumulado</span>
                    <span>Teto R$ 81.000</span>
                  </Box>
                </Box>
              </Box>

              {/* Floating Badge (Ganha-Ganha) */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -18,
                  right: -10,
                  bgcolor: '#1E3A8A',
                  color: '#FFFFFF',
                  borderRadius: '18px',
                  p: 2,
                  boxShadow: '0 8px 24px rgba(30, 58, 138, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <CardGiftcardIcon sx={{ fontSize: 26, color: '#93C5FD' }} />
                <Box>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, lineHeight: 1.2 }}>
                    Indicação Confirmada
                  </Typography>
                  <Typography sx={{ fontSize: '0.6875rem', color: '#BFDBFE' }}>
                    30 dias sem custo para você
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
