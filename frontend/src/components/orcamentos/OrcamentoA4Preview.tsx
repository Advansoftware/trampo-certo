'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DescriptionIcon from '@mui/icons-material/Description';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import HandshakeIcon from '@mui/icons-material/Handshake';

export interface OrcamentoPreviewItem {
  id: string;
  descricao: string;
  subDescricao?: string;
  qtd: number;
  unidade?: string;
  unitario: number;
}

interface OrcamentoA4PreviewProps {
  codigo?: string;
  clienteNome: string;
  clienteTelefone: string;
  clienteLocalizacao?: string;
  itens: OrcamentoPreviewItem[];
  subtotal: number;
  desconto: number;
  total: number;
  condicoesPagamento: string;
  chavePix: string;
  validade: string;
  observacoes: string;
}

export default function OrcamentoA4Preview({
  codigo = '042',
  clienteNome,
  clienteTelefone,
  clienteLocalizacao = 'São Paulo - SP',
  itens,
  subtotal,
  desconto,
  total,
  condicoesPagamento,
  chavePix,
  validade,
  observacoes,
}: OrcamentoA4PreviewProps) {
  const formatMoney = (val: number) =>
    val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Box sx={{ position: { lg: 'sticky' }, top: 96, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {/* Preview Header Control */}
      <Box data-print-hide="true" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DescriptionIcon sx={{ fontSize: 19, color: '#1E3A8A' }} />
          <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#1A1B20' }}>
            Pré-visualização do Documento A4
          </Typography>
          <Box
            sx={{
              px: 1.5,
              py: 0.25,
              borderRadius: '9999px',
              bgcolor: '#DBEAFE',
              color: '#172554',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            PDF Dinâmico
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#74777F', fontSize: '11px' }}>
          <span>Zoom: 100%</span>
          <IconButton
            size="small"
            title="Visualizar tela inteira"
            onClick={() => window.print()}
            sx={{
              width: 32,
              height: 32,
              bgcolor: '#FFFFFF',
              border: '1px solid rgba(196, 198, 207, 0.4)',
              color: '#43474E',
              '&:hover': { bgcolor: '#F1F4F9', color: '#1A1B20' },
            }}
          >
            <FullscreenIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Real A4 Sheet Canvas */}
      <Box
        id="a4-sheet-canvas"
        sx={{
          bgcolor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid rgba(196, 198, 207, 0.4)',
          boxShadow: '0 8px 30px rgba(30, 41, 59, 0.08)',
          p: { xs: 3, sm: 4, lg: 5 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 780,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Document Header */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'flex-start' },
              justifyContent: 'space-between',
              gap: 2,
              pb: 2.5,
              borderBottom: '1px solid rgba(196, 198, 207, 0.3)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.75 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '16px',
                  bgcolor: '#1E3A8A',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '17px',
                  boxShadow: '0 2px 8px rgba(30, 58, 138, 0.25)',
                  flexShrink: 0,
                }}
              >
                RS
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#1A1B20', lineHeight: 1.2 }}>
                  Rodrigo Silva
                </Typography>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#1E3A8A' }}>
                  Serviços Elétricos & Instalações
                </Typography>
                <Typography sx={{ fontSize: '11px', color: '#74777F', mt: 0.5 }}>
                  CNPJ MEI: 45.123.789/0001-90
                </Typography>
                <Typography sx={{ fontSize: '11px', color: '#74777F' }}>
                  (11) 97722-3344 • São Paulo - SP
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                bgcolor: '#F1F4F9',
                border: '1px solid rgba(196, 198, 207, 0.4)',
                p: 1.5,
                borderRadius: '16px',
                textAlign: { xs: 'left', sm: 'right' },
              }}
            >
              <Typography sx={{ fontSize: '10px', color: '#1E3A8A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Proposta Comercial
              </Typography>
              <Typography sx={{ fontSize: '17px', fontWeight: 800, color: '#1A1B20', letterSpacing: '-0.01em' }}>
                ORÇAMENTO #{codigo}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '11px', color: '#74777F', mt: 0.5, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                <CalendarTodayIcon sx={{ fontSize: 13 }} />
                <span>18 de Outubro de 2024</span>
              </Box>
            </Box>
          </Box>

          {/* Client Card & Meta Row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
              p: 2,
              bgcolor: '#F1F4F9',
              border: '1px solid rgba(196, 198, 207, 0.4)',
              borderRadius: '16px',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: '10px', color: '#74777F', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>
                Cliente Destinatário
              </Typography>
              <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#1A1B20', mt: 0.25 }}>
                {clienteNome || 'Juliana Mendes'}
              </Typography>
              <Typography sx={{ fontSize: '12px', color: '#74777F' }}>
                {clienteLocalizacao}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', sm: 'flex-end' }, justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '10px', color: '#74777F', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>
                Contato do Cliente
              </Typography>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#1A1B20', mt: 0.25 }}>
                {clienteTelefone || '(11) 98765-4321'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '11px', color: '#1E3A8A', fontWeight: 600, mt: 0.25 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#1E3A8A' }} />
                <span>WhatsApp Confirmado</span>
              </Box>
            </Box>
          </Box>

          {/* Items Table */}
          <Box sx={{ borderRadius: '14px', border: '1px solid rgba(196, 198, 207, 0.4)', overflow: 'hidden' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '6fr 2fr 2fr 2fr',
                px: 2,
                py: 1.25,
                bgcolor: '#F1F4F9',
                fontSize: '11px',
                fontWeight: 700,
                color: '#43474E',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              <span>Descrição dos Serviços / Materiais</span>
              <span style={{ textAlign: 'center' }}>Qtd</span>
              <span style={{ textAlign: 'right' }}>Unitário</span>
              <span style={{ textAlign: 'right' }}>Subtotal</span>
            </Box>

            <Box sx={{ bgcolor: '#FFFFFF', divideY: '1px solid rgba(196, 198, 207, 0.25)' }}>
              {itens.map((item, idx) => {
                const sub = item.qtd * item.unitario;
                return (
                  <Box
                    key={item.id || idx}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '6fr 2fr 2fr 2fr',
                      px: 2,
                      py: 1.5,
                      fontSize: '12px',
                      alignItems: 'center',
                      borderBottom: '1px solid rgba(196, 198, 207, 0.25)',
                      '&:last-child': { borderBottom: 0 },
                    }}
                  >
                    <Box sx={{ pr: 1 }}>
                      <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#1A1B20', lineHeight: 1.3 }}>
                        {item.descricao || 'Item de serviço'}
                      </Typography>
                      {item.subDescricao && (
                        <Typography sx={{ fontSize: '11px', color: '#74777F' }}>
                          {item.subDescricao}
                        </Typography>
                      )}
                    </Box>
                    <Typography sx={{ fontSize: '12px', textAlign: 'center', color: '#1A1B20', fontWeight: 500 }}>
                      {item.qtd} {item.unidade || 'un'}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', textAlign: 'right', color: '#74777F' }}>
                      R$ {formatMoney(item.unitario)}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', textAlign: 'right', fontWeight: 700, color: '#1A1B20' }}>
                      R$ {formatMoney(sub)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Financial Summary & Conditions */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', gap: 2, pt: 1 }}>
            {/* Conditions Box */}
            <Box
              sx={{
                flex: 1,
                p: 1.5,
                bgcolor: '#F1F4F9',
                border: '1px solid rgba(196, 198, 207, 0.4)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.75,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#1E3A8A', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <VerifiedIcon sx={{ fontSize: 15 }} />
                <span>Condições e Acordos</span>
              </Box>
              <Typography sx={{ fontSize: '12px', color: '#1A1B20' }}>
                {condicoesPagamento}
              </Typography>
              <Box sx={{ mt: 0.5, pt: 0.75, borderTop: '1px solid rgba(196, 198, 207, 0.3)', display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '10px', color: '#74777F', textTransform: 'uppercase', fontWeight: 600 }}>
                  Chave PIX para Depósito / Sinal:
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#1E3A8A', fontWeight: 700, fontFamily: 'monospace' }}>
                  {chavePix}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '11px', color: '#74777F', mt: 0.25 }}>
                {validade}
              </Typography>
            </Box>

            {/* Totals Box */}
            <Box
              sx={{
                width: { xs: '100%', sm: 250 },
                p: 2,
                bgcolor: '#F1F4F9',
                border: '1px solid rgba(196, 198, 207, 0.4)',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#74777F' }}>
                <span>Subtotal Itens:</span>
                <span style={{ fontWeight: 600, color: '#1A1B20' }}>R$ {formatMoney(subtotal)}</span>
              </Box>
              {desconto > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#2563EB' }}>
                  <span>Desconto Aplicado:</span>
                  <span style={{ fontWeight: 600 }}>- R$ {formatMoney(desconto)}</span>
                </Box>
              )}
              <Box sx={{ height: 1, bgcolor: 'rgba(196, 198, 207, 0.4)', my: 0.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#1A1B20' }}>
                  Total Geral:
                </Typography>
                <Typography sx={{ fontSize: '20px', fontWeight: 800, color: '#1E3A8A', letterSpacing: '-0.02em' }}>
                  R$ {formatMoney(total)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Warranty Note */}
          <Box
            sx={{
              p: 1.5,
              bgcolor: 'rgba(241, 244, 249, 0.6)',
              border: '1px solid rgba(196, 198, 207, 0.4)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <SecurityIcon sx={{ fontSize: 17, color: '#1E3A8A', flexShrink: 0 }} />
            <Typography sx={{ fontSize: '12px', color: '#1A1B20' }}>
              {observacoes}
            </Typography>
          </Box>
        </Box>

        {/* Document Footer with Platform Trust */}
        <Box
          sx={{
            pt: 2.5,
            mt: 3,
            borderTop: '1px solid rgba(196, 198, 207, 0.4)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            color: '#74777F',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                bgcolor: '#1E3A8A',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HandshakeIcon sx={{ fontSize: 13 }} />
            </Box>
            <Typography sx={{ fontSize: '11px', color: '#43474E' }}>
              Documento gerado profissionalmente via <strong style={{ color: '#1E3A8A' }}>TrampoCerto</strong>
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '11px',
              color: '#74777F',
              cursor: 'pointer',
              '&:hover': { color: '#1E3A8A' },
            }}
          >
            Crie orçamentos gratuitos você também • trampocerto.com.br
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
