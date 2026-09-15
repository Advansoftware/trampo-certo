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
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AppButton from '@/components/common/AppButton';
import { formatMoeda } from '@/lib/format';
import { URL_PGMEI } from '@/lib/mei';

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
  competencia,
  valor = 0,
  vencimento,
  chavePix,
  onMarkPaid,
}: DasPixModalProps) {
  const [copiado, setCopiado] = useState(false);

  const copiarChave = () => {
    if (!chavePix) return;
    navigator.clipboard.writeText(chavePix);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
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
              Pagar a DAS com Pix
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
              {competencia && `Competência ${competencia}`}
              {competencia && vencimento && ' • '}
              {vencimento && `vence em ${vencimento}`}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small" aria-label="Fechar">
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
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
            Valor da guia (INSS + ISS)
          </Typography>
          <Typography
            sx={{ fontSize: '2rem', fontWeight: 800, color: '#1A1B20', letterSpacing: '-0.02em', mt: 0.25 }}
          >
            {formatMoeda(valor)}
          </Typography>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#43474E', mb: 1 }}>
            Pix Copia e Cola
          </Typography>

          {chavePix ? (
            <>
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
                  variant={copiado ? 'secondary' : 'primary'}
                  size="small"
                  onClick={copiarChave}
                  startIcon={
                    copiado ? (
                      <CheckCircleIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <ContentCopyIcon sx={{ fontSize: 16 }} />
                    )
                  }
                >
                  {copiado ? 'Copiado' : 'Copiar'}
                </AppButton>
              </Box>

              <Typography sx={{ fontSize: '0.75rem', color: '#74777F', mt: 1 }}>
                Copie o código, abra o app do banco e escolha Pix Copia e Cola.
              </Typography>
            </>
          ) : (
            <Typography sx={{ fontSize: '0.8125rem', color: '#74777F' }}>
              Nenhum código Pix foi gerado para esta competência. Emita a guia no PGMEI e pague pelo boleto.
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions
        sx={{ p: 2.5, borderTop: '1px solid rgba(196, 198, 207, 0.4)', justifyContent: 'space-between' }}
      >
        <AppButton
          variant="surface"
          size="small"
          startIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
          onClick={() => window.open(URL_PGMEI, '_blank')}
        >
          Emitir guia no PGMEI
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
              Marcar como paga
            </AppButton>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}
