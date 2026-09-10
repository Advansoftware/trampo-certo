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
import { ReciboData } from './ReciboPaperView';

interface NovoReciboModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (recibo: ReciboData) => void;
}

export default function NovoReciboModal({ open, onClose, onSave }: NovoReciboModalProps) {
  const [clienteNome, setClienteNome] = useState('');
  const [clienteDocumento, setClienteDocumento] = useState('');
  const [clienteTelefone, setClienteTelefone] = useState('');
  const [servicoDescricao, setServicoDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('pix');

  const formas = [
    { value: 'pix', label: 'Pix (Chave CNPJ / Telefone)' },
    { value: 'cartao', label: 'Cartão de Débito / Crédito' },
    { value: 'transferencia', label: 'Transferência Bancária (TED)' },
    { value: 'dinheiro', label: 'Dinheiro em Espécie' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numVal = parseFloat(valor.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
    if (!clienteNome || numVal <= 0 || !servicoDescricao) return;

    const formaObj = formas.find((f) => f.value === formaPagamento);
    const novoRecibo: ReciboData = {
      id: `rec-${Date.now()}`,
      codigo: `REC-2026-0${Math.floor(20 + Math.random() * 80)}`,
      clienteNome,
      clienteDocumento,
      clienteTelefone,
      servicoDescricao,
      valor: numVal,
      valorExtenso: `${numVal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} reais`,
      formaPagamento,
      formaPagamentoLabel: formaObj ? formaObj.label : 'Pix',
      dataPagamento: `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
      autenticacao: `TC-MEI-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    };

    onSave(novoRecibo);
    // Reset form
    setClienteNome('');
    setClienteDocumento('');
    setClienteTelefone('');
    setServicoDescricao('');
    setValor('');
    setFormaPagamento('pix');
    onClose();
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
                onChange={(e) => setFormaPagamento(e.target.value)}
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
        </DialogContent>

        <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(196, 198, 207, 0.4)' }}>
          <AppButton variant="surface" size="small" onClick={onClose}>
            Cancelar
          </AppButton>
          <AppButton
            variant="primary"
            size="medium"
            type="submit"
            startIcon={<CheckCircleIcon sx={{ fontSize: 18 }} />}
          >
            Emitir & Visualizar Recibo
          </AppButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
