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
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import AppButton from '@/components/common/AppButton';
import { formatMoeda, iniciais, linkWhatsApp } from '@/lib/format';
import { Cliente } from '@/types';

interface ClienteDetalhesModalProps {
  open: boolean;
  onClose: () => void;
  cliente: Cliente | null;
  /** Persiste as tags e devolve o cliente atualizado (hook useClientes). */
  onAtualizarTags?: (id: string, tags: string[]) => Promise<Cliente>;
  onErro?: (erro: unknown) => void;
}

export default function ClienteDetalhesModal({
  open,
  onClose,
  cliente,
  onAtualizarTags,
  onErro,
}: ClienteDetalhesModalProps) {
  const router = useRouter();
  const [newTagInput, setNewTagInput] = React.useState('');
  const [salvandoTag, setSalvandoTag] = React.useState(false);

  // As tags exibidas vêm sempre do cliente recebido por prop: a página repassa
  // o registro atualizado pela API, então a lista e o modal nunca divergem.
  const tags = cliente?.tags ?? [];

  const salvarTags = React.useCallback(
    async (proximas: string[]) => {
      if (!cliente || !onAtualizarTags) return;
      setSalvandoTag(true);
      try {
        await onAtualizarTags(cliente.id, proximas);
      } catch (erro) {
        onErro?.(erro);
      } finally {
        setSalvandoTag(false);
      }
    },
    [cliente, onAtualizarTags, onErro],
  );

  if (!cliente) return null;

  const isPj = cliente.tipo === 'PJ';
  const formatMoney = formatMoeda;

  const getInitials = iniciais;

  const handleWhatsApp = () => {
    const mensagem =
      `Olá ${cliente.nome}! 👋 Aqui é da TrampoCerto. ` +
      'Estou à disposição caso precise de um novo orçamento ou suporte!';
    window.open(linkWhatsApp(cliente.telefone, mensagem), '_blank');
  };

  const handleGerarOrcamento = () => {
    onClose();
    router.push(`/orcamentos/novo?clienteId=${cliente.id}`);
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
                  onClick={() => void salvarTags(tags.filter((atual) => atual !== tag))}
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
                  const nova = newTagInput.trim();
                  if (nova && !tags.includes(nova)) {
                    setNewTagInput('');
                    void salvarTags([...tags, nova]);
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
              disabled={salvandoTag}
              onClick={() => {
                const nova = newTagInput.trim();
                if (nova && !tags.includes(nova)) {
                  setNewTagInput('');
                  void salvarTags([...tags, nova]);
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
                  onClick={() => void salvarTags([...tags, sug])}
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
