'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DescriptionIcon from '@mui/icons-material/Description';
import SpeedIcon from '@mui/icons-material/Speed';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import StarIcon from '@mui/icons-material/Star';
import AppButton from '@/components/common/AppButton';

interface ReferralBenefitsProps {
  referrerName: string;
}

export default function ReferralBenefits({ referrerName }: ReferralBenefitsProps) {
  const features = [
    {
      icon: DescriptionIcon,
      iconBg: '#DBEAFE',
      iconColor: '#1E3A8A',
      title: 'Orçamento em PDF pelo WhatsApp',
      desc: 'Você monta a proposta no celular em menos de 2 minutos e manda o PDF direto para o cliente.',
    },
    {
      icon: SpeedIcon,
      iconBg: '#DCFCE7',
      iconColor: '#166534',
      title: 'Termômetro do teto do MEI',
      desc: 'Você vê quanto já faturou no ano e quanto ainda cabe antes de encostar nos R$ 81 mil.',
    },
    {
      icon: QrCode2Icon,
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      title: 'Recibo com a sua chave Pix',
      desc: 'Terminou o serviço, você emite o recibo com a chave Pix junto e marca o pagamento como recebido.',
    },
    {
      icon: PeopleAltIcon,
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
      title: 'Histórico dos seus clientes',
      desc: 'Quem aprovou, quem ainda não respondeu e quanto você cobrou nos serviços anteriores.',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Você entra pelo convite',
      desc: `Você se cadastra pelo link que ${referrerName} mandou. Leva menos de um minuto.`,
    },
    {
      number: '2',
      title: '30 dias de Pro grátis',
      desc: 'Todos os recursos do plano Pro liberados, sem cobrança nenhuma no período.',
    },
    {
      number: '3',
      title: 'Seu amigo também ganha',
      desc: `${referrerName} ganha mais um mês de assinatura por ter te indicado.`,
    },
  ];

  const testimonials = [
    {
      name: 'Carlos Eduardo',
      job: 'Eletricista residencial',
      text: 'Eu mandava orçamento pelo bloco de notas do celular. Desde que passei a mandar a folha A4 do TrampoCerto, o cliente responde bem mais rápido.',
      stars: 5,
    },
    {
      name: 'Mariana Souza',
      job: 'Marcenaria e instalações',
      text: 'O termômetro do teto me salvou de desenquadrar no fim do ano passado. E dá para mexer no celular na correria da oficina.',
      stars: 5,
    },
    {
      name: 'André Guimarães',
      job: 'Pintor e reformas',
      text: 'Mandar a cobrança no Pix junto com o recibo resolveu a parte chata de ficar cobrando pagamento.',
      stars: 5,
    },
  ];

  return (
    <Box sx={{ pb: { xs: 8, md: 12 }, bgcolor: '#F8F9FD' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2.5, sm: 4, lg: 6 } }}>
        {/* Section 1: Features */}
        <Box sx={{ textAlign: 'center', mb: 6, pt: 6 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.5,
              borderRadius: '9999px',
              bgcolor: '#DBEAFE',
              color: '#172554',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              mb: 1.5,
            }}
          >
            O que vem no Pro
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              color: '#1A1B20',
              letterSpacing: '-0.02em',
              mb: 1,
            }}
          >
            Os seus trampos organizados em um lugar só
          </Typography>
          <Typography sx={{ color: '#43474E', fontSize: '1rem', maxWidth: 640, mx: 'auto' }}>
            Sem caderno perdido e sem dúvida sobre quanto entrou no mês.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {features.map((f) => {
            const IconComp = f.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={f.title}>
                <Box
                  sx={{
                    bgcolor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid rgba(196, 198, 207, 0.4)',
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 4px rgba(30, 41, 59, 0.03)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 24px rgba(30, 41, 59, 0.07)',
                      borderColor: 'rgba(30, 58, 138, 0.25)',
                    },
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '14px',
                        bgcolor: f.iconBg,
                        color: f.iconColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <IconComp sx={{ fontSize: 26 }} />
                    </Box>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#1A1B20', mb: 1, lineHeight: 1.3 }}>
                      {f.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#43474E', lineHeight: 1.6 }}>
                      {f.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Section 2: How referral works (Ganha-Ganha) */}
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid rgba(196, 198, 207, 0.4)',
            p: { xs: 3, sm: 5 },
            mb: 8,
            boxShadow: '0 2px 12px rgba(30, 41, 59, 0.04)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.5,
                borderRadius: '9999px',
                bgcolor: '#DCFCE7',
                color: '#166534',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                mb: 1.5,
              }}
            >
              <CardGiftcardIcon sx={{ fontSize: 16 }} />
              Programa Ganha-Ganha
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.5rem', md: '1.875rem' },
                color: '#1A1B20',
                mb: 1,
              }}
            >
              Como funciona o convite de {referrerName}
            </Typography>
            <Typography sx={{ color: '#43474E', fontSize: '0.9375rem', maxWidth: 540, mx: 'auto' }}>
              No programa de indicação, quem convida e quem é convidado ganham um mês.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {steps.map((st) => (
              <Grid size={{ xs: 12, md: 4 }} key={st.number}>
                <Box
                  sx={{
                    bgcolor: '#F8F9FD',
                    borderRadius: '18px',
                    p: 3,
                    border: '1px solid rgba(196, 198, 207, 0.3)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      bgcolor: '#1E3A8A',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.9375rem',
                    }}
                  >
                    {st.number}
                  </Box>
                  <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: '#1A1B20' }}>
                    {st.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8125rem', color: '#43474E', lineHeight: 1.5 }}>
                    {st.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Section 3: Testimonials */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.5rem', md: '1.875rem' },
                color: '#1A1B20',
                mb: 1,
              }}
            >
              Quem já usa no dia a dia
            </Typography>
            <Typography sx={{ color: '#43474E', fontSize: '0.9375rem' }}>
              O que outros autônomos contam sobre o TrampoCerto.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {testimonials.map((t) => (
              <Grid size={{ xs: 12, md: 4 }} key={t.name}>
                <Box
                  sx={{
                    bgcolor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid rgba(196, 198, 207, 0.4)',
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 4px rgba(30, 41, 59, 0.03)',
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5, color: '#EAB308' }}>
                      {[...Array(t.stars)].map((_, i) => (
                        <StarIcon key={i} sx={{ fontSize: 18 }} />
                      ))}
                    </Box>
                    <Typography sx={{ fontSize: '0.875rem', color: '#43474E', fontStyle: 'italic', mb: 2, lineHeight: 1.6 }}>
                      &ldquo;{t.text}&rdquo;
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#1A1B20' }}>
                      {t.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
                      {t.job}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Final CTA Banner */}
        <Box
          sx={{
            bgcolor: '#1E3A8A',
            color: '#FFFFFF',
            borderRadius: '24px',
            p: { xs: 4, sm: 6 },
            textAlign: 'center',
            boxShadow: '0 12px 36px rgba(30, 58, 138, 0.28)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ maxWidth: 640, mx: 'auto', position: 'relative', zIndex: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                letterSpacing: '-0.02em',
                mb: 1.5,
              }}
            >
              Comece pelos seus 30 dias grátis
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: '#BFDBFE', mb: 3.5, lineHeight: 1.5 }}>
              O convite de {referrerName} libera o período sem cobrança e sem pedir cartão.
            </Typography>
            <AppButton
              variant="secondary"
              size="large"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{
                py: 1.6,
                px: 4,
                fontSize: '1rem',
                fontWeight: 700,
                bgcolor: '#FFFFFF',
                color: '#1E3A8A',
                '&:hover': { bgcolor: '#F1F4F9' },
              }}
            >
              Ativar Meu Convite de 30 Dias
            </AppButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
