'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { useEmissor } from '@/components/providers/PerfilProvider';
import { formatDataHora, formatNumero } from '@/lib/format';
import { Recibo } from '@/types';

interface ReciboPaperViewProps {
  recibo: Recibo;
}

export default function ReciboPaperView({ recibo }: ReciboPaperViewProps) {
  const emissor = useEmissor();
  const formatMoney = formatNumero;

  return (
    <Box
      id="recibo-sheet-canvas"
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid rgba(196, 198, 207, 0.4)',
        boxShadow: '0 8px 30px rgba(30, 41, 59, 0.08)',
        p: { xs: 3, sm: 4, md: 5 },
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 3.5,
        width: '100%',
        maxWidth: 780,
        mx: 'auto',
      }}
    >
      {/* Top Accent Line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          bgcolor: '#1E3A8A',
        }}
      />

      {/* 1. Header do Recibo */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          pb: 2.5,
          borderBottom: '2px solid rgba(196, 198, 207, 0.35)',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '16px',
              bgcolor: '#1E3A8A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
              boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)',
            }}
          >
            RS
          </Box>
          <Box>
            <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1B20', lineHeight: 1.2 }}>
              {emissor.nome} (MEI)
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#43474E', mt: 0.25 }}>
              {[emissor.cnpj && `CNPJ: ${emissor.cnpj}`, emissor.ocupacao].filter(Boolean).join(' • ')}
            </Typography>
            <Typography sx={{ fontSize: '0.6875rem', color: '#74777F' }}>
              São Paulo - SP • (11) 98765-4321
            </Typography>
          </Box>
        </Box>

        {/* Badge Recibo & Código */}
        <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.5,
              py: 0.4,
              borderRadius: '9999px',
              bgcolor: '#DCFCE7',
              color: '#166534',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              mb: 0.5,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 15 }} />
            Recibo Quitado
          </Box>
          <Typography sx={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.95rem', color: '#1E3A8A' }}>
            {recibo.codigo}
          </Typography>
        </Box>
      </Box>

      {/* 2. Destaque do Valor */}
      <Box
        sx={{
          bgcolor: '#F8F9FD',
          border: '1px solid rgba(196, 198, 207, 0.4)',
          borderRadius: '16px',
          p: 2.5,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Valor Total Recebido
          </Typography>
          <Typography sx={{ fontSize: '1.875rem', fontWeight: 800, color: '#1A1B20', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            R$ {formatMoney(recibo.valor)}
          </Typography>
          {recibo.valorExtenso && (
            <Typography sx={{ fontSize: '0.8125rem', color: '#1E3A8A', fontWeight: 600, fontStyle: 'italic', mt: 0.5 }}>
              ({recibo.valorExtenso})
            </Typography>
          )}
        </Box>

        <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Forma de Pagamento
          </Typography>
          <Typography sx={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1A1B20', mt: 0.25 }}>
            {recibo.formaPagamentoLabel}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#74777F', mt: 0.25 }}>
            Pago em {formatDataHora(recibo.dataPagamento)}
          </Typography>
        </Box>
      </Box>

      {/* 3. Declaração Legal de Quitação */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Termo de Quitação de Serviços
        </Typography>

        <Box
          sx={{
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            color: '#1A1B20',
            bgcolor: '#FFFFFF',
            p: 2.5,
            border: '1px solid rgba(196, 198, 207, 0.35)',
            borderRadius: '14px',
          }}
        >
          Recebi(emos) de{' '}
          <strong style={{ color: '#1E3A8A' }}>{recibo.clienteNome}</strong>
          {recibo.clienteDocumento ? `, portador(a) do CPF/CNPJ nº ${recibo.clienteDocumento}` : ''},
          a quantia líquida e certa de{' '}
          <strong>R$ {formatMoney(recibo.valor)}</strong>
          {recibo.valorExtenso ? ` (${recibo.valorExtenso})` : ''},
          referente à prestação dos serviços especializados de:
          <Box
            sx={{
              mt: 1.25,
              mb: 1.25,
              p: 1.5,
              bgcolor: '#F8F9FD',
              borderRadius: '10px',
              fontWeight: 600,
              color: '#1A1B20',
              borderLeft: '4px solid #1E3A8A',
            }}
          >
            {recibo.servicoDescricao}
          </Box>
          Pelo que firmo(amos) o presente recibo, conferindo plena, rasa, geral e irrevogável quitação do valor recebido.
        </Box>
      </Box>

      {/* 4. Rodapé e Validação Digital */}
      <Box
        sx={{
          pt: 2.5,
          borderTop: '1px dashed rgba(196, 198, 207, 0.4)',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'flex-end' },
          gap: 2.5,
        }}
      >
        {/* Assinatura Digital do MEI */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#166534' }}>
            <VerifiedIcon sx={{ fontSize: 18 }} />
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700 }}>
              Assinatura Eletrônica Válida
            </Typography>
          </Box>
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1B20' }}>
            RODRIGO SILVA INSTALACOES ELETRICAS MEI
          </Typography>
          <Typography sx={{ fontSize: '0.6875rem', color: '#74777F' }}>
            Emissor Autorizado • Lei Complementar nº 123/2006
          </Typography>
        </Box>

        {/* Autenticação & QR Code visual */}
        <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <QrCode2Icon sx={{ fontSize: 28, color: '#1E3A8A' }} />
            <Box>
              <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, color: '#74777F', textTransform: 'uppercase' }}>
                Código de Autenticidade
              </Typography>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 800, color: '#1E3A8A' }}>
                {recibo.autenticacao}
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize: '0.6875rem', color: '#A0A3AD', mt: 0.5 }}>
            Emitido via TrampoCerto Gestor Financeiro MEI
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
