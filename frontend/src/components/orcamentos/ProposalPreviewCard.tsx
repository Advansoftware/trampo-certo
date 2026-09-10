'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SaveIcon from '@mui/icons-material/Save';
import Logo from '@/components/Logo';
import { OrcamentoItem } from './ItemsTableCard';

interface ProposalPreviewCardProps {
  codigo: string;
  clienteNome: string;
  clienteTelefone: string;
  clienteDocumento?: string;
  itens: OrcamentoItem[];
  valorTotal: number;
  condicoesPagamento: string;
  validadeDias: number;
  observacoes?: string;
  onSendWhatsApp: () => void;
  onSave: () => void;
}

export default function ProposalPreviewCard({
  codigo,
  clienteNome,
  clienteTelefone,
  clienteDocumento,
  itens,
  valorTotal,
  condicoesPagamento,
  validadeDias,
  observacoes,
  onSendWhatsApp,
  onSave,
}: ProposalPreviewCardProps) {
  return (
    <Card
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: 5,
        bgcolor: '#FFFFFF',
        border: '1px solid rgba(222, 226, 235, 0.9)',
        boxShadow: '0px 8px 32px rgba(0, 32, 69, 0.06)',
        position: { lg: 'sticky' },
        top: 24,
      }}
    >
      {/* Top Accent Line */}
      <Box
        sx={{
          height: 4,
          borderRadius: 9999,
          background: 'linear-gradient(90deg, #002045 0%, #C85A32 100%)',
          mb: 2.5,
        }}
      />

      {/* Preview Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Logo height={32} />
        <Chip
          label="Prévia da Proposta"
          size="small"
          sx={{ bgcolor: 'rgba(0, 32, 69, 0.08)', fontWeight: 700, color: 'primary.main', height: 22 }}
        />
      </Box>

      {/* Provider Details Box */}
      <Box sx={{ p: 1.5, bgcolor: '#F6F7FB', borderRadius: 2.5, mb: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          Profissional Emitente:
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main' }}>
          Rodrigo Silva (Eletricista MEI)
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          CNPJ: 45.123.789/0001-90 • Chave Pix Cadastrada
        </Typography>
      </Box>

      <Divider sx={{ my: 1.5 }} />

      {/* Client Details Box */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          Proposta para o Cliente:
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary' }}>
          {clienteNome || 'Nome do Cliente'}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {clienteTelefone} {clienteDocumento ? `• Doc: ${clienteDocumento}` : ''}
        </Typography>
      </Box>

      {/* Itemized Summary */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', mb: 1, display: 'block' }}
        >
          Resumo dos Serviços
        </Typography>
        <Stack spacing={1}>
          {itens.map((i, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 0.5,
                borderBottom: '1px dashed rgba(116, 119, 127, 0.12)',
              }}
            >
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                {i.qtd}x {i.descricao || 'Item sem descrição'}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main', ml: 1, flexShrink: 0 }}>
                R$ {(i.qtd * i.unitario).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Total Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderRadius: 3,
          bgcolor: '#002045',
          color: '#FFFFFF',
          my: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'rgba(255, 255, 255, 0.8)' }}>
          Total do Orçamento:
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
          R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Typography>
      </Box>

      {/* Payment terms */}
      <Box sx={{ p: 1.5, bgcolor: '#F5F7FB', borderRadius: 2.5, mb: 3 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block' }}>
          Condições de Pagamento:
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {condicoesPagamento}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
          Válido por {validadeDias} dias corridos.
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Stack spacing={1.5}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<WhatsAppIcon />}
          onClick={onSendWhatsApp}
          sx={{
            bgcolor: '#25D366',
            color: '#FFFFFF',
            py: 1.3,
            fontWeight: 700,
            fontSize: '0.95rem',
            borderRadius: 9999,
            boxShadow: '0px 4px 14px rgba(37, 211, 102, 0.25)',
            '&:hover': {
              bgcolor: '#1EBE5D',
            },
          }}
        >
          Enviar Proposta no WhatsApp
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<SaveIcon />}
          onClick={onSave}
          sx={{
            py: 1.2,
            borderRadius: 9999,
            fontWeight: 700,
          }}
        >
          Salvar Proposta
        </Button>
      </Stack>
    </Card>
  );
}
