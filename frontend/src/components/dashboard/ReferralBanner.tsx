'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import StarsIcon from '@mui/icons-material/Stars';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RedeemIcon from '@mui/icons-material/Redeem';
import AppButton from '@/components/common/AppButton';
import { usePerfilMei } from '@/components/providers/PerfilProvider';
import { slugificar } from '@/lib/format';

const DOMINIO = 'trampocerto.com.br';

interface ReferralBannerProps {
  /** Avisa a página para exibir o toast; sem isso a cópia é silenciosa. */
  onCopiado?: (mensagem: string) => void;
}

export default function ReferralBanner({ onCopiado }: ReferralBannerProps) {
  const perfil = usePerfilMei();
  const slug = slugificar(perfil?.name || '') || 'convite';
  const linkIndicacao = `${DOMINIO}/indicar/${slug}`;

  const copiarLink = async () => {
    await navigator.clipboard.writeText(`https://${linkIndicacao}`);
    onCopiado?.('Link de indicação copiado.');
  };

  const compartilharWhatsApp = () => {
    const texto = encodeURIComponent(
      `Opa! Estou usando o TrampoCerto para mandar orçamentos e controlar o limite anual do MEI. Dá uma olhada: https://${linkIndicacao}`,
    );
    window.open(`https://wa.me/?text=${texto}`, '_blank');
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#0F172A',
        color: '#FFFFFF',
        borderRadius: '24px',
        p: { xs: 3, md: 4 },
        border: '1px solid rgba(196, 198, 207, 0.2)',
        boxShadow: '0 4px 16px rgba(15, 23, 42, 0.12)',
      }}
    >
      {/* Marca d'água decorativa */}
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: { xs: 'auto', md: '33.333%' },
          opacity: 0.1,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'flex-end',
          pr: '40px',
          pointerEvents: 'none',
          color: '#FFFFFF',
        }}
      >
        <RedeemIcon sx={{ fontSize: 200 }} />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 10, maxWidth: 672, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 1.75,
            py: 0.5,
            borderRadius: '9999px',
            bgcolor: '#DBEAFE',
            color: '#172554',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            width: 'fit-content',
          }}
        >
          <StarsIcon sx={{ fontSize: 16 }} />
          Programa parceiro
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography
            component="h3"
            sx={{
              fontWeight: 700,
              color: '#FFFFFF',
              fontSize: { xs: '1.25rem', sm: '1.35rem' },
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
            }}
          >
            Indique o TrampoCerto e ganhe um mês de Pro
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#CBD5E1', lineHeight: 1.55 }}>
            A cada colega autônomo que criar a conta pelo seu link, você ganha um mês grátis do plano Pro.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 1.5,
            pt: 0.5,
          }}
        >
          <Box
            sx={{
              flex: 1,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(12px)',
              px: 2,
              py: '7px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#FFFFFF',
              fontSize: '13px',
            }}
          >
            <Box
              component="span"
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {linkIndicacao}
            </Box>
            <IconButton
              onClick={() => void copiarLink()}
              size="small"
              title="Copiar link"
              sx={{
                color: '#FFFFFF',
                ml: 1,
                p: '4px',
                transition: 'background-color 0.15s ease',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
              }}
            >
              <ContentCopyIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>

          <AppButton
            variant="secondary"
            size="medium"
            onClick={compartilharWhatsApp}
            sx={{ whiteSpace: 'nowrap', px: 3 }}
          >
            Compartilhar no WhatsApp
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
}
