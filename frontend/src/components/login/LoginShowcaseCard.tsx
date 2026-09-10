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
      {/* Ambient Glow Orbs */}
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

      {/* Top Brand Header within Card */}
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
            Ecossistema do MEI de Sucesso
          </Typography>
        </Box>

        <Logo height={32} white />
      </Box>

      {/* Core Headline & Micro-Chips */}
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
          Menos burocracia, mais lucro
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
          O seu dia a dia profissional organizado sem complicação.
        </Typography>

        {/* Fast Benefit Chips */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {/* Item 1 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              borderRadius: '16px',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: '#A23E18',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <BoltOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
              Orçamentos profissionais em 2 minutos via WhatsApp
            </Typography>
          </Box>

          {/* Item 2 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              borderRadius: '16px',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: '#ADC7F7',
                color: '#002045',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ReceiptLongOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
              Guia DAS com Pix Copia-e-Cola automático sem multas
            </Typography>
          </Box>

          {/* Item 3 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              borderRadius: '16px',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: '#DBE2FD',
                color: '#192034',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldOutlinedIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
              Alerta inteligente de limite anual (R$ 81.000 MEI)
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Interactive Live Feature Preview: Termômetro do Teto MEI */}
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10B981' }} />
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#002045' }}>
              Termômetro Fiscal MEI
            </Typography>
          </Box>

          <Box
            sx={{
              px: 1.25,
              py: 0.25,
              borderRadius: 9999,
              bgcolor: '#E6F4EA',
              color: '#137333',
              fontSize: '0.6875rem',
              fontWeight: 700,
            }}
          >
            Margem Segura
          </Box>
        </Box>

        {/* Gauge Metric */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1.5 }}>
          <Box>
            <Typography sx={{ fontSize: '0.75rem', color: '#74777F', fontWeight: 500 }}>
              Faturamento Acumulado (2024)
            </Typography>
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#002045' }}>
              R$ 52.450,00
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontSize: '0.75rem', color: '#74777F', fontWeight: 500 }}>
              Margem Livre
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#137333' }}>
              R$ 28.550,00
            </Typography>
          </Box>
        </Box>

        {/* Visual Progress Bar */}
        <Box sx={{ width: '100%', bgcolor: '#EDEDF4', borderRadius: 9999, height: 10, overflow: 'hidden' }}>
          <Box
            sx={{
              height: '100%',
              bgcolor: '#002045',
              borderRadius: 9999,
              width: '64.7%',
              transition: 'width 1s ease-in-out',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, fontSize: '0.6875rem', color: '#74777F' }}>
          <span>0%</span>
          <span style={{ color: '#002045', fontWeight: 700 }}>64.7% utilizado</span>
          <span>Teto: R$ 81.000</span>
        </Box>
      </Box>

      {/* Social Proof Testimonial */}
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
              &ldquo;O TrampoCerto salvou meu controle de notas e orçamentos. Hoje passo muito mais credibilidade aos meus clientes.&rdquo;
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#FFDBCF', fontWeight: 600, mt: 0.5 }}>
              Rodrigo Silva <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 400 }}>— Eletricista & MEI, São Paulo</span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
