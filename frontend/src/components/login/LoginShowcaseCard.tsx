'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import Logo from '@/components/Logo';
import TermometroTetoDemo from '@/components/common/TermometroTetoDemo';
import ChipBeneficio from './ChipBeneficio';

const beneficios = [
  {
    icone: <BoltOutlinedIcon sx={{ fontSize: 18 }} />,
    corFundoIcone: '#A23E18',
    corIcone: '#FFFFFF',
    texto: 'Orçamento em PDF pelo WhatsApp em 2 minutos',
  },
  {
    icone: <ReceiptLongOutlinedIcon sx={{ fontSize: 18 }} />,
    corFundoIcone: '#ADC7F7',
    corIcone: '#002045',
    texto: 'Guia do DAS com Pix Copia e Cola antes do vencimento',
  },
  {
    icone: <ShieldOutlinedIcon sx={{ fontSize: 18 }} />,
    corFundoIcone: '#DBE2FD',
    corIcone: '#192034',
    texto: 'Aviso quando o faturamento se aproxima dos R$ 81 mil',
  },
];

export default function LoginShowcaseCard() {
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: { lg: 680 },
        background: 'linear-gradient(135deg, #002045 0%, #1A365D 50%, #2E354A 100%)',
        borderRadius: '24px',
        p: { xs: 3, sm: 4, lg: 5 },
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 20px 40px -15px rgba(0, 32, 69, 0.3)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Brilhos de fundo */}
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 320,
          height: 320,
          bgcolor: 'rgba(254, 131, 87, 0.2)',
          borderRadius: '50%',
          filter: 'blur(64px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -40,
          left: -40,
          width: 280,
          height: 280,
          bgcolor: 'rgba(173, 199, 247, 0.2)',
          borderRadius: '50%',
          filter: 'blur(56px)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            px: 2,
            py: 0.75,
            borderRadius: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <WorkspacePremiumOutlinedIcon sx={{ fontSize: 18, color: '#FFDBCF' }} />
          <Typography sx={{ fontSize: '0.8125rem', color: '#FFFFFF', fontWeight: 600 }}>
            Feito para quem é MEI
          </Typography>
        </Box>

        <Logo height={32} white />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 2, my: 2 }}>
        <Typography
          sx={{
            color: '#FFDBCF',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            mb: 1,
            display: 'block',
          }}
        >
          A papelada do mês em um lugar só
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.25,
            fontSize: { xs: '1.4rem', sm: '1.75rem' },
            mb: 3,
          }}
        >
          Orçamento, recibo e imposto sem abrir o computador.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {beneficios.map((beneficio) => (
            <ChipBeneficio
              key={beneficio.texto}
              icone={beneficio.icone}
              corFundoIcone={beneficio.corFundoIcone}
              corIcone={beneficio.corIcone}
            >
              {beneficio.texto}
            </ChipBeneficio>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          my: 2.5,
          bgcolor: '#FFFFFF',
          color: '#1A1B20',
          borderRadius: '24px',
          p: 2.5,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        }}
      >
        <TermometroTetoDemo compacto />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 2, pt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            src="/rodrigo-avatar.jpg"
            alt="Rodrigo Silva"
            sx={{ width: 48, height: 48, border: '2px solid rgba(255, 255, 255, 0.4)' }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: '0.8125rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontStyle: 'italic',
                lineHeight: 1.35,
              }}
            >
              &ldquo;Parei de perder orçamento no meio das conversas do WhatsApp. Agora fica tudo registrado.&rdquo;
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#FFDBCF', fontWeight: 600, mt: 0.5 }}>
              Rodrigo Silva{' '}
              <Box component="span" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 400 }}>
                • Eletricista MEI, São Paulo
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
