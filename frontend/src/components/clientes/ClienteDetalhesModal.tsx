'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AppButton from '@/components/common/AppButton';
import { ClienteItemData } from './ClientesMetrics';
import { updateCliente } from '@/lib/api';

interface ClienteDetalhesModalProps {
  open: boolean;
  onClose: () => void;
  cliente: ClienteItemData | null;
  onUpdateCliente?: (cliente: ClienteItemData) => void;
}

export default function ClienteDetalhesModal({
  open,
  onClose,
  cliente,
  onUpdateCliente,
}: ClienteDetalhesModalProps) {
  const router = useRouter();
  const [tags, setTags] = React.useState<string[]>([]);
  const [newTagInput, setNewTagInput] = React.useState('');
  const [isSavingTag, setIsSavingTag] = React.useState(false);

  React.useEffect(() => {
    if (cliente) {
      setTags(cliente.tags || ['Cliente Ativo']);
    }
  }, [cliente]);

  if (!cliente) return null;

  const isPj = (cliente.tipo || '').toUpperCase() === 'PJ';

  const formatMoney = (val: number) => {
    const safe = typeof val === 'number' && !isNaN(val) ? val : 0;
    return `R$ ${safe.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getInitials = (name: string) => {
    const parts = (name || '').trim().split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return (name || 'CL').substring(0, 2).toUpperCase();
  };

  const handleWhatsApp = () => {
    const tel = (cliente.telefone || '').replace(/\D/g, '');
    const texto = encodeURIComponent(
      `Olá ${cliente.nome}! 👋 Aqui é da TrampoCerto. Estou à disposição caso precise de um novo orçamento ou suporte!`,
    );
    const url = tel ? `https://wa.me/55${tel}?text=${texto}` : `https://wa.me/?text=${texto}`;
    window.open(url, '_blank');
  };

  const handleGerarOrcamento = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'trampo_novo_orcamento_cliente',
        JSON.stringify({
          clienteNome: cliente.nome,
          clienteTelefone: cliente.telefone,
          clienteLocalizacao: `${cliente.bairro ? cliente.bairro + ', ' : ''}${cliente.cidade || 'São Paulo - SP'}`,
        })
      );
    }
    onClose();
    router.push('/orcamentos/novo');
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
      {/* Header */}
      <DialogTitle
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderBottom: '1px solid rgba(196, 198, 207, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ fontWeight: 800, color: '#1A1B20', fontSize: '1.125rem' }}>
          Ficha do Cliente
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#74777F' }}>
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2.5, sm: 3.5 }, pt: '32px !important' }}>
        {/* Profile Card */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: isPj ? '#E0E7FF' : '#DBEAFE',
              color: isPj ? '#3730A3' : '#172554',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {getInitials(cliente.nome)}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '1.125rem', fontWeight: 800, color: '#1A1B20' }}>
                {cliente.nome}
              </Typography>
              <Box
                sx={{
                  px: 1,
                  py: 0.2,
                  borderRadius: '6px',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  bgcolor: isPj ? '#EEF2FF' : '#F1F4F9',
                  color: isPj ? '#3730A3' : '#43474E',
                  border: '1px solid rgba(196, 198, 207, 0.3)',
                }}
              >
                {cliente.tipo || 'PF'}
              </Box>
            </Box>
            <Typography sx={{ fontSize: '0.8125rem', color: '#74777F', mt: 0.25, fontFamily: 'monospace' }}>
              {cliente.documento || 'Documento não cadastrado'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <LocationOnIcon sx={{ fontSize: 15, color: '#74777F' }} />
              <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
                {cliente.bairro ? `${cliente.bairro}, ` : ''}{cliente.cidade || 'São Paulo - SP'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Financial & Performance Stats */}
        <Grid container spacing={1.5} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Box sx={{ p: 1.5, bgcolor: '#F8F9FD', borderRadius: '16px', border: '1px solid rgba(196, 198, 207, 0.3)' }}>
              <Typography sx={{ fontSize: '0.6875rem', color: '#74777F', fontWeight: 600 }}>
                Total Faturado
              </Typography>
              <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#1A1B20', mt: 0.5 }}>
                {formatMoney(cliente.totalFaturado)}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Box sx={{ p: 1.5, bgcolor: '#F8F9FD', borderRadius: '16px', border: '1px solid rgba(196, 198, 207, 0.3)' }}>
              <Typography sx={{ fontSize: '0.6875rem', color: '#74777F', fontWeight: 600 }}>
                Propostas
              </Typography>
              <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#1A1B20', mt: 0.5 }}>
                {cliente.totalPropostas} emitidas
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Box sx={{ p: 1.5, bgcolor: '#F8F9FD', borderRadius: '16px', border: '1px solid rgba(196, 198, 207, 0.3)' }}>
              <Typography sx={{ fontSize: '0.6875rem', color: '#74777F', fontWeight: 600 }}>
                Aprovações
              </Typography>
              <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#166534', mt: 0.5 }}>
                {cliente.propostasAprovadas} aceitas
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Box sx={{ p: 1.5, bgcolor: '#F8F9FD', borderRadius: '16px', border: '1px solid rgba(196, 198, 207, 0.3)' }}>
              <Typography sx={{ fontSize: '0.6875rem', color: '#74777F', fontWeight: 600 }}>
                Último Serviço
              </Typography>
              <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#1A1B20', mt: 0.5 }}>
                {cliente.ultimoServico || 'Recente'}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Contact Info Box */}
        <Box sx={{ p: 2, bgcolor: '#F8F9FD', borderRadius: '16px', border: '1px solid rgba(196, 198, 207, 0.3)', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#43474E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Canais de Comunicação
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WhatsAppIcon sx={{ fontSize: 18, color: '#15803D' }} />
              <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#1A1B20' }}>
                {cliente.telefone || 'Não informado'}
              </Typography>
            </Box>
            {cliente.telefone && (
              <AppButton variant="secondary" size="xsmall" onClick={handleWhatsApp} startIcon={<WhatsAppIcon sx={{ fontSize: 14 }} />}>
                Conversar
              </AppButton>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon sx={{ fontSize: 18, color: '#1E3A8A' }} />
              <Typography sx={{ fontSize: '0.875rem', color: '#43474E' }}>
                {cliente.email || 'Não informado'}
              </Typography>
            </Box>
            {cliente.email && (
              <AppButton variant="surface" size="xsmall" onClick={() => window.open(`mailto:${cliente.email}`)}>
                Enviar E-mail
              </AppButton>
            )}
          </Box>
        </Box>

        {/* Tags & Quick Tagging Section */}
        <Box sx={{ mt: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#43474E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Etiquetas & Segmentação
            </Typography>
            <Typography sx={{ fontSize: '0.6875rem', color: '#74777F' }}>
              Clique para remover ou use os atalhos abaixo
            </Typography>
          </Box>

          {/* Current Tags with remove option */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {tags.map((tag, tIdx) => (
              <Box
                key={tIdx}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.25,
                  py: 0.35,
                  borderRadius: '9999px',
                  bgcolor: '#DBEAFE',
                  color: '#172554',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  border: '1px solid rgba(30, 58, 138, 0.15)',
                }}
              >
                <span>{tag}</span>
                <CloseIcon
                  onClick={() => {
                    const next = tags.filter((t) => t !== tag);
                    setTags(next);
                    updateCliente(cliente.id, { tags: next });
                    if (onUpdateCliente) onUpdateCliente({ ...cliente, tags: next });
                  }}
                  sx={{
                    fontSize: 14,
                    cursor: 'pointer',
                    color: '#74777F',
                    borderRadius: '50%',
                    '&:hover': { color: '#DC2626', bgcolor: 'rgba(220, 38, 38, 0.1)' },
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Quick Input to Add Tag */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Digite uma nova tag (ex: VIP, Parceiro)..."
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  const val = newTagInput.trim();
                  if (val && !tags.includes(val)) {
                    const next = [...tags, val];
                    setTags(next);
                    setNewTagInput('');
                    updateCliente(cliente.id, { tags: next });
                    if (onUpdateCliente) onUpdateCliente({ ...cliente, tags: next });
                  }
                }
              }}
              slotProps={{
                input: {
                  sx: {
                    borderRadius: '12px',
                    bgcolor: '#F8F9FD',
                    fontSize: '0.8125rem',
                  },
                },
              }}
              sx={{ flex: 1 }}
            />
            <AppButton
              variant="outlined"
              size="small"
              startIcon={<AddIcon sx={{ fontSize: 16 }} />}
              onClick={() => {
                const val = newTagInput.trim();
                if (val && !tags.includes(val)) {
                  const next = [...tags, val];
                  setTags(next);
                  setNewTagInput('');
                  updateCliente(cliente.id, { tags: next });
                  if (onUpdateCliente) onUpdateCliente({ ...cliente, tags: next });
                }
              }}
            >
              Adicionar
            </AppButton>
          </Box>

          {/* One-click Popular Tag Suggestions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '0.6875rem', color: '#74777F', fontWeight: 600 }}>
              Sugestões rápidas:
            </Typography>
            {['Recorrente', 'VIP', 'Bom Pagador', 'Comercial', 'Pontual', 'Indicação'].map((sug) => {
              const alreadyHas = tags.includes(sug);
              if (alreadyHas) return null;
              return (
                <Box
                  key={sug}
                  onClick={() => {
                    const next = [...tags, sug];
                    setTags(next);
                    updateCliente(cliente.id, { tags: next });
                    if (onUpdateCliente) onUpdateCliente({ ...cliente, tags: next });
                  }}
                  sx={{
                    px: 1,
                    py: 0.2,
                    borderRadius: '9999px',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    bgcolor: '#F1F4F9',
                    color: '#43474E',
                    cursor: 'pointer',
                    border: '1px dashed rgba(196, 198, 207, 0.8)',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      bgcolor: '#DBEAFE',
                      color: '#1E3A8A',
                      borderColor: '#1E3A8A',
                    },
                  }}
                >
                  + {sug}
                </Box>
              );
            })}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderTop: '1px solid rgba(196, 198, 207, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <AppButton variant="surface" size="small" onClick={onClose}>
          Fechar
        </AppButton>

        <AppButton
          variant="primary"
          size="small"
          startIcon={<PostAddIcon sx={{ fontSize: 17 }} />}
          onClick={handleGerarOrcamento}
        >
          Novo Orçamento
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
