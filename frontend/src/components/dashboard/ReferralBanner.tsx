'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import StarsIcon from '@mui/icons-material/Stars';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RedeemIcon from '@mui/icons-material/Redeem';
import AppButton from '@/components/common/AppButton';

export default function ReferralBanner() {
  const referralLink = 'trampocerto.com.br/indicar/rodrigo-silva-78';

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${referralLink}`);
    alert('Link de indicação copiado!');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Opa! Estou usando o TrampoCerto para mandar orçamentos e controlar o limite anual do MEI. Dá uma olhada: https://${referralLink}`,
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
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
      {/* Watermark Illustration: idêntica ao Stitch com pr-10 (40px) e alinhada à direita com margem */}
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
        {/* Badge */}
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
          Programa Parceiro TrampoCerto
        </Box>

        {/* Title & Description */}
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
            Seus clientes elogiam seus orçamentos e recibos?
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#CBD5E1', lineHeight: 1.55 }}>
            Indique o TrampoCerto para outros profissionais autônomos ou amigos MEI. A cada novo colega cadastrado, você ganha <strong style={{ color: '#FFFFFF' }}>1 mês grátis de emissor ilimitado e assessoria de teto MEI</strong>.
          </Typography>
        </Box>

        {/* Input & WhatsApp Action */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 1.5,
            pt: 0.5,
          }}
        >
          {/* Link pill */}
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
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {referralLink}
            </span>
            <IconButton
              onClick={handleCopy}
              size="small"
              title="Copiar Link"
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

          {/* WhatsApp Button: bg-secondary (#2563EB), hover:bg-primary (#1E3A8A) com border e shadow fiéis */}
          <AppButton
            variant="secondary"
            size="medium"
            onClick={handleShareWhatsApp}
            sx={{
              whiteSpace: 'nowrap',
              px: 3,
            }}
          >
            Compartilhar no WhatsApp
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
}
