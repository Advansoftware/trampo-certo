'use client';

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AppButton from '@/components/common/AppButton';

interface DasPixModalProps {
  open: boolean;
  onClose: () => void;
  competencia?: string;
  valor?: number;
  vencimento?: string;
  chavePix?: string;
  onMarkPaid?: () => void;
}

export default function DasPixModal({
  open,
  onClose,
  competencia = 'Outubro/2026',
  valor = 75.60,
  vencimento = '20/10/2026',
  chavePix = '00020126580014br.gov.bcb.pix0136451237890001905204000053039865802BR5913RODRIGO SILVA6009SAO PAULO62070503***6304E2A1',
  onMarkPaid,
}: DasPixModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(chavePix);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        backdrop: {
          sx: { bgcolor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(8px)' },
        },
        paper: {
          sx: {
            borderRadius: '24px',
            bgcolor: '#FFFFFF',
            boxShadow: '0 24px 48px -12px rgba(15, 23, 42, 0.25)',
            overflow: 'hidden',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 2.5,
          borderBottom: '1px solid rgba(196, 198, 207, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '12px',
              bgcolor: '#DBEAFE',
              color: '#1E3A8A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <QrCode2Icon sx={{ fontSize: 24 }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1B20' }}>
              Pagar Guia DAS MEI via Pix
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
              Competência {competencia} • Vencimento em {vencimento}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        {/* Value Box */}
        <Box
          sx={{
            width: '100%',
            p: 2,
            borderRadius: '16px',
            bgcolor: '#F8F9FD',
            border: '1px solid rgba(196, 198, 207, 0.4)',
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontSize: '0.75rem', color: '#74777F', fontWeight: 600, textTransform: 'uppercase' }}>
            Valor Total da Guia Mensal (INSS + ISS)
          </Typography>
          <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: '#1A1B20', letterSpacing: '-0.02em', mt: 0.25 }}>
            R$ {valor.toFixed(2).replace('.', ',')}
          </Typography>
        </Box>

        {/* QR Code Graphic Box */}
        <Box
          sx={{
            p: 2.5,
            bgcolor: '#FFFFFF',
            borderRadius: '20px',
            border: '2px solid rgba(30, 58, 138, 0.2)',
            boxShadow: '0 8px 24px rgba(30, 41, 59, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <QrCode2Icon sx={{ fontSize: 160, color: '#1E3A8A' }} />
          <Typography sx={{ fontSize: '0.75rem', color: '#74777F', textAlign: 'center', maxWidth: 260 }}>
            Abra o app do seu banco, escolha <strong>Pagar com Pix</strong> e aponte a câmera para o código.
          </Typography>
        </Box>

        {/* Pix Copia e Cola Code */}
        <Box sx={{ width: '100%' }}>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#43474E', mb: 1 }}>
            Chave Pix Copia e Cola da Guia DAS
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 1.5,
              borderRadius: '14px',
              bgcolor: '#F8F9FD',
              border: '1px solid rgba(196, 198, 207, 0.5)',
              gap: 1.5,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#43474E',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flexGrow: 1,
              }}
            >
              {chavePix}
            </Typography>
            <AppButton
              variant={copied ? 'secondary' : 'primary'}
              size="small"
              onClick={handleCopy}
              startIcon={copied ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : <ContentCopyIcon sx={{ fontSize: 16 }} />}
            >
              {copied ? 'Copiado!' : 'Copiar'}
            </AppButton>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(196, 198, 207, 0.4)', justifyContent: 'space-between' }}>
        <AppButton
          variant="surface"
          size="small"
          startIcon={<PictureAsPdfIcon sx={{ fontSize: 16 }} />}
          onClick={() => {
            alert('Gerando documento PDF da guia DAS oficial (PGMEI Receita Federal)...');
          }}
        >
          Baixar Boleto PDF
        </AppButton>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <AppButton variant="surface" size="small" onClick={onClose}>
            Fechar
          </AppButton>
          {onMarkPaid && (
            <AppButton
              variant="secondary"
              size="small"
              startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
              onClick={() => {
                onMarkPaid();
                onClose();
              }}
            >
              Marcar como Pago
            </AppButton>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}
