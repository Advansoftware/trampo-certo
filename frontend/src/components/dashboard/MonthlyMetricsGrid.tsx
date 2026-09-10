'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DownloadIcon from '@mui/icons-material/Download';
import PaymentsIcon from '@mui/icons-material/Payments';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import AppButton from '@/components/common/AppButton';

interface DasMeiData {
  competencia: string;
  valor: number;
  vencimento: string;
  status: string;
  chavePix?: string;
}

interface MonthlyMetricsGridProps {
  dasMei?: DasMeiData;
  highlights?: any[];
  onCobrarPix?: () => void;
}

export default function MonthlyMetricsGrid({ dasMei }: MonthlyMetricsGridProps) {
  const safeDas = dasMei || {
    competencia: 'Outubro/2024',
    valor: 75.6,
    vencimento: '20/10/2024',
    status: 'pendente',
    chavePix: '00020126580014br.gov.bcb.pix0136451237890001905204000053039865802BR5913RODRIGO SILVA6009SAO PAULO62070503***6304E2A1',
  };

  return (
    <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
      {/* DAS MEI Attention Card (Col 4) */}
      <Grid size={{ xs: 12, lg: 4 }}>
        <Box
          sx={{
            height: '100%',
            bgcolor: '#FFFFFF',
            border: '1px solid rgba(196, 198, 207, 0.5)',
            borderRadius: '24px',
            p: 3.5,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2.5,
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#74777F' }}>
                Guia Obrigatória DAS
              </Typography>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.75,
                  px: 1.5,
                  py: 0.25,
                  borderRadius: '9999px',
                  bgcolor: '#FFFBEB',
                  border: '1px solid #FDE68A',
                  color: '#D97706',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#D97706' }} />
                Vence em 5 dias
              </Box>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1A1B20', fontSize: '1.05rem', pt: 0.5 }}>
              Competência: {safeDas.competencia || 'Outubro/2024'}
            </Typography>
            <Typography sx={{ fontSize: '0.8125rem', color: '#74777F', mb: 2 }}>
              Vencimento em 20 de Outubro
            </Typography>

            {/* Sub-box Valor Total */}
            <Box
              sx={{
                bgcolor: '#F1F4F9',
                border: '1px solid rgba(196, 198, 207, 0.3)',
                p: 2,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography sx={{ fontSize: '0.75rem', color: '#74777F' }}>
                  Valor Total (INSS + ISS)
                </Typography>
                <Typography sx={{ fontSize: '1.35rem', fontWeight: 800, color: '#1A1B20' }}>
                  R$ {(safeDas.valor ?? 75.6).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>
              <AccountBalanceWalletIcon sx={{ color: '#D97706', fontSize: 26 }} />
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <AppButton
              fullWidth
              variant="accent"
              size="medium"
              startIcon={<QrCode2Icon sx={{ fontSize: 20 }} />}
              onClick={() => {
                if (safeDas.chavePix) {
                  navigator.clipboard.writeText(safeDas.chavePix);
                  alert('Chave Pix copiada com sucesso!');
                } else {
                  alert('Chave Pix: 45.123.789/0001-90');
                }
              }}
            >
              Pagar com PIX Copia e Cola
            </AppButton>

            <AppButton
              fullWidth
              variant="text"
              size="small"
              startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
              onClick={() => window.open('https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/pgmei.app/', '_blank')}
              sx={{ fontWeight: 600 }}
            >
              Baixar Guia PDF (PGMEI)
            </AppButton>
          </Box>
        </Box>
      </Grid>

      {/* Metrics Grid (Col 8) -> 4 Cards 2x2 */}
      <Grid size={{ xs: 12, lg: 8 }}>
        <Grid container spacing={2.5}>
          {/* Card 1: Faturado em Outubro */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid rgba(196, 198, 207, 0.5)',
                p: 3,
                borderRadius: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#74777F' }}>
                  Faturado em Outubro
                </Typography>
                <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#DBEAFE', color: '#1E3A8A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PaymentsIcon sx={{ fontSize: 20 }} />
                </Box>
              </Box>

              <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: '#1A1B20', my: 1.5, letterSpacing: '-0.02em' }}>
                R$ 6.800<span style={{ fontSize: '1.25rem', color: '#43474E', fontWeight: 600 }}>,00</span>
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#1E3A8A', fontSize: '0.75rem', fontWeight: 600 }}>
                <TrendingUpIcon sx={{ fontSize: 16 }} />
                <span>+14% em relação a Setembro</span>
              </Box>
            </Box>
          </Grid>

          {/* Card 2: Orçamentos em Aberto */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid rgba(196, 198, 207, 0.5)',
                p: 3,
                borderRadius: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#74777F' }}>
                  Orçamentos em Aberto
                </Typography>
                <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#F1F4F9', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PendingActionsIcon sx={{ fontSize: 20 }} />
                </Box>
              </Box>

              <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: '#1A1B20', my: 1.5, letterSpacing: '-0.02em' }}>
                R$ 4.200<span style={{ fontSize: '1.25rem', color: '#43474E', fontWeight: 600 }}>,00</span>
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#2563EB', fontSize: '0.75rem', fontWeight: 600 }}>
                <ScheduleIcon sx={{ fontSize: 16 }} />
                <span>3 propostas aguardando resposta</span>
              </Box>
            </Box>
          </Grid>

          {/* Card 3: Taxa de Conversão */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid rgba(196, 198, 207, 0.5)',
                p: 3,
                borderRadius: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#74777F' }}>
                  Taxa de Conversão
                </Typography>
                <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#E0E7FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TaskAltIcon sx={{ fontSize: 20 }} />
                </Box>
              </Box>

              <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: '#1A1B20', my: 1.5, letterSpacing: '-0.02em' }}>
                78%
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#1E3A8A', fontSize: '0.75rem', fontWeight: 600 }}>
                <ThumbUpIcon sx={{ fontSize: 16 }} />
                <span>7 de 9 orçamentos aprovados</span>
              </Box>
            </Box>
          </Grid>

          {/* Card 4: Recibos Emitidos */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid rgba(196, 198, 207, 0.5)',
                p: 3,
                borderRadius: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#74777F' }}>
                  Recibos Emitidos
                </Typography>
                <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ReceiptIcon sx={{ fontSize: 20 }} />
                </Box>
              </Box>

              <Typography sx={{ fontSize: '2rem', fontWeight: 800, color: '#1A1B20', my: 1.5, letterSpacing: '-0.02em' }}>
                5 <span style={{ fontSize: '1.25rem', color: '#43474E', fontWeight: 400 }}>recibos</span>
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#74777F', fontSize: '0.75rem' }}>
                <CloudDoneIcon sx={{ fontSize: 16 }} />
                <span>100% arquivados na nuvem MEI</span>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
