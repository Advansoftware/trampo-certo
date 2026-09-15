'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DownloadIcon from '@mui/icons-material/Download';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AppButton from '@/components/common/AppButton';
import { formatNumero } from '@/lib/format';
import { URL_PGMEI } from '@/lib/mei';
import { DasCompetencia } from '@/types';

interface DasMeiCardProps {
  das: DasCompetencia;
  onCopiarPix: (chave: string) => void;
}

/** Card de atenção da guia DAS do mês corrente. */
export default function DasMeiCard({ das, onCopiarPix }: DasMeiCardProps) {
  const pago = das.status === 'pago';

  return (
    <Box
      sx={{
        height: '100%',
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(196, 198, 207, 0.5)',
        borderRadius: '24px',
        p: 3.5,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2.5,
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ fontSize: '0.9375rem', fontWeight: 800, color: '#1A1B20' }}>
            Guia DAS · {das.competenciaLabel}
          </Typography>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.25,
              py: 0.3,
              borderRadius: '9999px',
              bgcolor: pago ? '#DCFCE7' : '#FEF3C7',
              color: pago ? '#15803D' : '#92400E',
              fontSize: '0.6875rem',
              fontWeight: 700,
            }}
          >
            {pago ? <CheckCircleIcon sx={{ fontSize: 13 }} /> : <EventBusyIcon sx={{ fontSize: 13 }} />}
            {pago ? 'Paga' : 'Pendente'}
          </Box>
        </Box>

        <Typography sx={{ fontSize: '0.8125rem', color: '#74777F', mb: 2 }}>
          {pago
            ? `Pagamento registrado em ${das.pagoEm}.`
            : `Vence em ${das.vencimento}. Pagando em dia, o CNPJ segue regular.`}
        </Typography>

        <Box
          sx={{
            bgcolor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '16px',
            p: 2,
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>Valor total (INSS + ISS/ICMS)</Typography>
            <Typography sx={{ fontSize: '1.35rem', fontWeight: 800, color: '#1A1B20' }}>
              R$ {formatNumero(das.valor)}
            </Typography>
          </Box>
          <AccountBalanceWalletIcon sx={{ color: '#D97706', fontSize: 26 }} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <AppButton
          fullWidth
          variant="accent"
          size="medium"
          startIcon={<QrCode2Icon sx={{ fontSize: 20 }} />}
          onClick={() => onCopiarPix(das.chavePix)}
        >
          Copiar chave Pix do MEI
        </AppButton>

        <AppButton
          fullWidth
          variant="text"
          size="small"
          startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
          onClick={() => window.open(URL_PGMEI, '_blank')}
          sx={{ fontWeight: 600 }}
        >
          Emitir guia no PGMEI
        </AppButton>
      </Box>
    </Box>
  );
}
