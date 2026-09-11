'use client';

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AppButton from '@/components/common/AppButton';
import { ApiError } from '@/lib/api';
import { parseValor } from '@/lib/format';
import { FORMAS_PAGAMENTO, FormaPagamento, Recibo, ReciboInput } from '@/types';

interface NovoReciboModalProps {
  open: boolean;
  onClose: () => void;
  /** Emite o recibo na API — código, valor por extenso e autenticação vêm de lá. */
  onEmitir: (input: ReciboInput) => Promise<Recibo>;
  onEmitido?: (recibo: Recibo) => void;
}

export default function NovoReciboModal({ open, onClose, onEmitir, onEmitido }: NovoReciboModalProps) {
  const [clienteNome, setClienteNome] = useState('');
  const [clienteDocumento, setClienteDocumento] = useState('');
  const [clienteTelefone, setClienteTelefone] = useState('');
  const [servicoDescricao, setServicoDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>('pix');
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const formas = FORMAS_PAGAMENTO;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valorNumerico = parseValor(valor);

    if (!clienteNome.trim() || !servicoDescricao.trim() || valorNumerico <= 0) {
      setErro('Preencha cliente, descrição do serviço e um valor maior que zero.');
      return;
    }

    setSalvando(true);
    setErro('');
    try {
      const recibo = await onEmitir({
        clienteNome: clienteNome.trim(),
        clienteDocumento: clienteDocumento.trim(),
        clienteTelefone: clienteTelefone.trim(),
        servicoDescricao: servicoDescricao.trim(),
        valor: valorNumerico,
        formaPagamento,
      });

      onEmitido?.(recibo);
      setClienteNome('');
      setClienteDocumento('');
      setClienteTelefone('');
      setServicoDescricao('');
      setValor('');
      setFormaPagamento('pix');
      onClose();
    } catch (err) {
      setErro(err instanceof ApiError ? err.message : 'Não foi possível emitir o recibo.');
    } finally {
      setSalvando(false);
    }
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
            <ReceiptLongIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1B20' }}>
              Emitir Novo Recibo MEI
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
              Gere comprovante com quitação e validade jurídica
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            label="Nome do Cliente / Empresa"
            placeholder="ex: Mariana Costa"
            value={clienteNome}
            onChange={(e) => setClienteNome(e.target.value)}
            required
            fullWidth
            size="small"
          />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="CPF ou CNPJ (Opcional)"
                placeholder="000.000.000-00"
                value={clienteDocumento}
                onChange={(e) => setClienteDocumento(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="WhatsApp do Cliente"
                placeholder="(11) 99999-9999"
                value={clienteTelefone}
                onChange={(e) => setClienteTelefone(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>

          <TextField
            label="Descrição do Serviço Prestado"
            placeholder="ex: Instalação de quadro de distribuição e 8 tomadas"
            value={servicoDescricao}
            onChange={(e) => setServicoDescricao(e.target.value)}
            required
            fullWidth
            multiline
            rows={2}
            size="small"
          />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Valor Recebido (R$)"
                placeholder="1450,00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
                fullWidth
                size="small"
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Forma de Pagamento"
                select
                value={formaPagamento}
                onChange={(e) => setFormaPagamento(e.target.value as FormaPagamento)}
                fullWidth
                size="small"
              >
                {formas.map((f) => (
                  <MenuItem key={f.value} value={f.value}>
                    {f.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {erro && (
            <Typography sx={{ fontSize: '0.8125rem', color: '#B91C1C', fontWeight: 600 }}>{erro}</Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(196, 198, 207, 0.4)' }}>
          <AppButton variant="surface" size="small" onClick={onClose} disabled={salvando}>
            Cancelar
          </AppButton>
          <AppButton
            variant="primary"
            size="medium"
            type="submit"
            disabled={salvando}
            startIcon={<CheckCircleIcon sx={{ fontSize: 18 }} />}
          >
            {salvando ? 'Emitindo...' : 'Emitir & visualizar recibo'}
          </AppButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
