'use client';

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import Grid from '@mui/material/Grid';
import AppButton from '@/components/common/AppButton';
import { ApiError } from '@/lib/api';
import { Cliente, ClienteInput, ClienteTipo } from '@/types';

interface NovoClienteModalProps {
  open: boolean;
  initialNome?: string;
  onClose: () => void;
  /** Persiste o cliente (vem do hook useClientes, que atualiza a lista). */
  onCriarCliente: (input: ClienteInput) => Promise<Cliente>;
  onClienteCriado?: (cliente: Cliente) => void;
}

export default function NovoClienteModal({
  open,
  initialNome = '',
  onClose,
  onCriarCliente,
  onClienteCriado,
}: NovoClienteModalProps) {
  const [tipo, setTipo] = useState<ClienteTipo>('PF');
  // null = o usuário ainda não digitou: usa o nome sugerido por quem abriu o modal.
  const [nomeEditado, setNomeEditado] = useState<string | null>(null);
  const nome = nomeEditado ?? initialNome;
  const [documento, setDocumento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [tag, setTag] = useState('Novo Cliente');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!nome.trim()) {
      setErro('O nome ou razão social é obrigatório.');
      return;
    }

    setLoading(true);
    setErro('');
    try {
      const criado = await onCriarCliente({
        nome: nome.trim(),
        tipo,
        documento: documento.trim(),
        telefone: telefone.trim(),
        email: email.trim(),
        cidade: cidade.trim(),
        bairro: bairro.trim(),
        tags: tag ? [tag] : [],
      });

      onClienteCriado?.(criado);
      handleReset();
      onClose();
    } catch (err) {
      // Documento duplicado e validações do servidor chegam como ApiError.
      setErro(err instanceof ApiError ? err.message : 'Não foi possível cadastrar o cliente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setNomeEditado(null);
    setDocumento('');
    setTelefone('');
    setEmail('');
    setBairro('');
    setErro('');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
          },
        },
        paper: {
          sx: {
            borderRadius: '24px',
            bgcolor: '#FFFFFF',
            backgroundImage: 'none',
            boxShadow: '0 24px 48px -12px rgba(15, 23, 42, 0.25)',
            overflow: 'hidden',
            m: { xs: 1.5, sm: 3 },
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderBottom: '1px solid rgba(196, 198, 207, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              bgcolor: '#DBEAFE',
              color: '#1E3A8A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PersonAddIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, color: '#1A1B20', fontSize: '1.125rem' }}>
              Cadastrar Novo Cliente
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
              Adicione os dados para emissão rápida de propostas e recibos
            </Typography>
          </Box>
        </Box>

        <IconButton onClick={onClose} sx={{ color: '#74777F' }}>
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2.5, sm: 3.5 }, pt: '32px !important' }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 0.5 }}>
          {/* Tipo Selector com espaçamento generoso entre opções */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#43474E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tipo de Pessoa
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
              <Box
                onClick={() => setTipo('PF')}
                sx={{
                  flex: 1,
                  py: 1.5,
                  px: 2,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.25,
                  border: tipo === 'PF' ? '2px solid #1E3A8A' : '1px solid rgba(196, 198, 207, 0.6)',
                  bgcolor: tipo === 'PF' ? '#EFF6FF' : '#F8F9FD',
                  color: tipo === 'PF' ? '#1E3A8A' : '#43474E',
                  fontWeight: tipo === 'PF' ? 700 : 500,
                  fontSize: '0.875rem',
                  boxShadow: tipo === 'PF' ? '0 2px 8px rgba(30, 58, 138, 0.12)' : 'none',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: tipo === 'PF' ? '#DBEAFE' : '#F1F4F9',
                    borderColor: '#1E3A8A',
                  },
                }}
              >
                <PersonIcon sx={{ fontSize: 20 }} />
                <span>Pessoa Física (PF)</span>
              </Box>

              <Box
                onClick={() => setTipo('PJ')}
                sx={{
                  flex: 1,
                  py: 1.5,
                  px: 2,
                  borderRadius: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.25,
                  border: tipo === 'PJ' ? '2px solid #1E3A8A' : '1px solid rgba(196, 198, 207, 0.6)',
                  bgcolor: tipo === 'PJ' ? '#EFF6FF' : '#F8F9FD',
                  color: tipo === 'PJ' ? '#1E3A8A' : '#43474E',
                  fontWeight: tipo === 'PJ' ? 700 : 500,
                  fontSize: '0.875rem',
                  boxShadow: tipo === 'PJ' ? '0 2px 8px rgba(30, 58, 138, 0.12)' : 'none',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: tipo === 'PJ' ? '#DBEAFE' : '#F1F4F9',
                    borderColor: '#1E3A8A',
                  },
                }}
              >
                <BusinessIcon sx={{ fontSize: 20 }} />
                <span>Pessoa Jurídica (PJ)</span>
              </Box>
            </Box>
          </Box>

          {/* Nome / Razão Social */}
          <TextField
            label={tipo === 'PJ' ? 'Razão Social / Nome da Empresa' : 'Nome Completo do Cliente'}
            placeholder={tipo === 'PJ' ? 'Ex: TechSolutions Serviços Ltda' : 'Ex: Camila Duarte'}
            fullWidth
            size="small"
            required
            value={nome}
            onChange={(e) => {
              setNomeEditado(e.target.value);
              if (erro) setErro('');
            }}
            error={Boolean(erro)}
            helperText={erro}
            slotProps={{
              input: { sx: { borderRadius: '12px' } },
            }}
          />

          {/* Documento (CPF / CNPJ) & Telefone */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label={tipo === 'PJ' ? 'CNPJ' : 'CPF'}
                placeholder={tipo === 'PJ' ? '00.000.000/0001-00' : '000.000.000-00'}
                fullWidth
                size="small"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                slotProps={{
                  input: { sx: { borderRadius: '12px' } },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="WhatsApp / Telefone"
                placeholder="(11) 98765-4321"
                fullWidth
                size="small"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                slotProps={{
                  input: { sx: { borderRadius: '12px' } },
                }}
              />
            </Grid>
          </Grid>

          {/* E-mail */}
          <TextField
            label="E-mail"
            placeholder="cliente@email.com"
            type="email"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            slotProps={{
              input: { sx: { borderRadius: '12px' } },
            }}
          />

          {/* Cidade & Bairro */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Bairro"
                placeholder="Ex: Pinheiros"
                fullWidth
                size="small"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                slotProps={{
                  input: { sx: { borderRadius: '12px' } },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Cidade / UF"
                placeholder="São Paulo - SP"
                fullWidth
                size="small"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                slotProps={{
                  input: { sx: { borderRadius: '12px' } },
                }}
              />
            </Grid>
          </Grid>

          {/* Tag de Relacionamento */}
          <TextField
            label="Tag / Categoria"
            select
            fullWidth
            size="small"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            slotProps={{
              select: { native: true },
              input: { sx: { borderRadius: '12px' } },
            }}
          >
            <option value="Novo Cliente">Novo Cliente</option>
            <option value="Recorrente">Cliente Recorrente</option>
            <option value="Comercial">Empresarial / Comercial</option>
            <option value="Pontual">Serviço Pontual</option>
            <option value="Top Faturamento">VIP / Alto Faturamento</option>
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderTop: '1px solid rgba(196, 198, 207, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 1.5,
        }}
      >
        <AppButton variant="surface" size="small" onClick={onClose}>
          Cancelar
        </AppButton>
        <AppButton
          variant="primary"
          size="small"
          loading={loading}
          onClick={handleSubmit}
          startIcon={<PersonAddIcon sx={{ fontSize: 17 }} />}
        >
          Salvar Cliente
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
